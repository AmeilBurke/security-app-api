import { Injectable } from '@nestjs/common';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { getAccountWithEmail, getRoleFromDB, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { BanLocation } from '@prisma/client';

@Injectable()
export class BannedPeopleService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    createBannedPersonWithBanDetailsDto: BannedPersonWithBanDetailsDto,
  ) {
    try {
      if (file === undefined) {
        createBannedPersonWithBanDetailsDto.bannedPerson_image = 'undefined';
      }
      const banProfile = await this.prisma.bannedPerson.create({
        data: {
          bannedPerson_image:
            createBannedPersonWithBanDetailsDto.bannedPerson_image,
          bannedPerson_name:
            createBannedPersonWithBanDetailsDto.bannedPerson_name
              .toLocaleLowerCase()
              .trim(),
        },
      });

      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');
      const venueManagerRole = await getRoleFromDB(
        this.prisma,
        'venue manager',
      );
      const businessManagerRole = await getRoleFromDB(
        this.prisma,
        'business manager',
      );

      const acceptedRoles = [
        adminRole.role_id,
        venueManagerRole.role_id,
        businessManagerRole.role_id,
      ];

      const isBanPending = !acceptedRoles.includes(
        uploaderAccount.account_roleId,
      );

      await this.prisma.banDetail.create({
        data: {
          banDetail_reason:
            createBannedPersonWithBanDetailsDto.banDetail_reason,
          banDetail_startDate:
            createBannedPersonWithBanDetailsDto.banDetail_startDate,
          banDetail_endDate:
            createBannedPersonWithBanDetailsDto.banDetail_endDate,
          banDetail_isBanPending: isBanPending,
          banDetail_bannedPersonId: banProfile.bannedPerson_id,
        },
      });

      if (typeof createBannedPersonWithBanDetailsDto.banLocation_venues === 'string') {
        const venueIdsConverted: number[] = JSON.parse(createBannedPersonWithBanDetailsDto.banLocation_venues).map((toBeConverted: string) => {
          return Number(toBeConverted);
        });

        createBannedPersonWithBanDetailsDto.banLocation_venues = venueIdsConverted;
      }

      const locationsToBeBannedFrom = createBannedPersonWithBanDetailsDto.banLocation_venues.map((venuIds: number) => {
        return {
          banLocation_bannedPersonId: banProfile.bannedPerson_id,
          banLocation_venueId: venuIds
        }
      });

      console.log(locationsToBeBannedFrom);

     const test = await this.prisma.banLocation.createMany({
        data: locationsToBeBannedFrom,
      });

      console.log(test);

      return await this.prisma.bannedPerson.findFirstOrThrow({
        where: {
          bannedPerson_id: banProfile.bannedPerson_id,
        },
        include: {
          BanDetail: true,
          BanLocation: true,
        },
      });
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async findAll() {
    return `This action returns all bannedPeople`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bannedPerson`;
  }

  update(id: number, updateBannedPersonDto: UpdateBannedPersonDto) {
    return `This action updates a #${id} bannedPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} bannedPerson`;
  }
}
