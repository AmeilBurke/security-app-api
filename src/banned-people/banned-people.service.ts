import { Injectable } from '@nestjs/common';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { getAccountWithEmail, getRoleFromDB, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BannedPeopleService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    bannedPersonWithBanDetailsDto: BannedPersonWithBanDetailsDto,
  ) {
    try {
      if (file === undefined) {
        bannedPersonWithBanDetailsDto.bannedPerson_image = 'undefined';
      }
      const banProfile = await this.prisma.bannedPerson.create({
        data: {
          bannedPerson_image: bannedPersonWithBanDetailsDto.bannedPerson_image,
          bannedPerson_name: bannedPersonWithBanDetailsDto.bannedPerson_name
            .toLocaleLowerCase()
            .trim(),
        },
      });

      console.log(banProfile);

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

      const banDetails = await this.prisma.banDetail.create({
        data: {
          banDetail_reason: bannedPersonWithBanDetailsDto.banDetail_reason,
          banDetail_startDate:
            bannedPersonWithBanDetailsDto.banDetail_startDate,
          banDetail_endDate: bannedPersonWithBanDetailsDto.banDetail_endDate,
          banDetail_isBanPending: isBanPending,
          banDetail_bannedPersonId: banProfile.bannedPerson_id,
        },
      });
      return this.prisma.bannedPerson.findFirstOrThrow({
        where: {
          bannedPerson_id: banProfile.bannedPerson_id,
        },
        include: {
          BanDetail: true,
        },
      });
    } catch (error: unknown) {
      handleError(error);
    }
  }

  findAll() {
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
