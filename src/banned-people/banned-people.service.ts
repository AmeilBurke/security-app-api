import { Injectable, StreamableFile } from '@nestjs/common';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithBanDetailsDto, RequestWithAccount } from 'src/types';
import { getAccountWithEmail, getRoleFromDB, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { createReadStream } from 'fs';
import type { Response as ExpressResponse } from 'express';
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
          bannedPerson_image: file.filename,
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

      if (
        typeof createBannedPersonWithBanDetailsDto.banLocation_venues ===
        'string'
      ) {
        const venueIdsConverted: number[] = JSON.parse(
          createBannedPersonWithBanDetailsDto.banLocation_venues,
        ).map((toBeConverted: string) => {
          return Number(toBeConverted);
        });

        createBannedPersonWithBanDetailsDto.banLocation_venues =
          venueIdsConverted;
      }

      const locationsToBeBannedFrom =
        createBannedPersonWithBanDetailsDto.banLocation_venues.map(
          (venuIds: number) => {
            return {
              banLocation_bannedPersonId: banProfile.bannedPerson_id,
              banLocation_venueId: venuIds,
            };
          },
        );

      await this.prisma.banLocation.createMany({
        data: locationsToBeBannedFrom,
      });

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

  // async findAll() {
  //   try {
  //     return `This action returns all bannedPeople`;
  //   } catch (error: unknown) {
  //     return handleError(error);
  //   }
  // }

  async findOne(id: number, res: ExpressResponse) {
    try {
      return await this.prisma.bannedPerson.findFirstOrThrow({
        where: {
          bannedPerson_id: id,
        },
        include: {
          BanDetail: true,
          BanLocation: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async getAccountPicture(id: number, res: ExpressResponse) {
    try {
      const bannedPersonDetails =
        await this.prisma.bannedPerson.findFirstOrThrow({
          where: {
            bannedPerson_id: id,
          },
        });

      if (bannedPersonDetails.bannedPerson_image === 'undefined') {
        return 'this person does not have any photos';
      } else {
        const file = createReadStream(
          `src\\images\\people\\${bannedPersonDetails.bannedPerson_image}`,
        );

        res.set({
          'Content-Type': `image/${bannedPersonDetails.bannedPerson_image.split('.')[1]}`,
        });

        return new StreamableFile(file);
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async getBannedPeopleByEstablishment(id: number) {
    try {
      const banLocationForVenue = await this.prisma.banLocation.findMany({
        where: {
          banLocation_venueId: id,
        },
      });

      const bannedPeopleIds = banLocationForVenue.map(
        (banLocations: BanLocation) => {
          return banLocations.banLocation_bannedPersonId;
        },
      );

      return await this.prisma.bannedPerson.findMany({
        where: {
          bannedPerson_id: {
            in: bannedPeopleIds,
          },
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  // need to add request: RequestWithAccount to services that need to check permissions

  async update(
    id: number,
    file: Express.Multer.File,
    request: RequestWithAccount,
    updateBannedPersonDto: UpdateBannedPersonDto,
  ) {
    try {

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

      const canAccountEdit = acceptedRoles.includes(
        uploaderAccount.account_roleId,
      );

      if(!canAccountEdit) {
        return 'you do not have permission to access this'
      }

      return this.prisma.bannedPerson.update({
        where: {
          bannedPerson_id: id,
        },
        data: {
          bannedPerson_name: updateBannedPersonDto.bannedPerson_name,
          bannedPerson_image:
            file !== undefined
              ? file.filename
              : updateBannedPersonDto.bannedPerson_image,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.bannedPerson.delete({
        where: {
          bannedPerson_id: id,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
