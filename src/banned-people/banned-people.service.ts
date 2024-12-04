import { Injectable, StreamableFile } from '@nestjs/common';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { BannedPersonWithSomeBanDetails, RequestWithAccount } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import {
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
} from 'src/utils';
import dayjs from 'dayjs';
import {
  AlertDetail,
  BanDetail,
  BannedPerson,
  VenueBan,
  VenueManager,
} from '@prisma/client';
import type { Response as ExpressResponse } from 'express';
import { createReadStream, promises as fs } from 'fs';
import path from 'path';

@Injectable()
export class BannedPeopleService {
  constructor(private prisma: PrismaService) {}
  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    createBannedPersonDto: BannedPersonWithSomeBanDetails,
  ): Promise<
    | string
    | (BannedPerson & { BanDetail: BanDetail[]; AlertDetail: AlertDetail[] })
  > {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const newBanProfile = await this.prisma.bannedPerson.create({
        data: {
          bannedPerson_name: createBannedPersonDto.bannedPerson_name
            .toLocaleLowerCase()
            .trim(),
          bannedPerson_imageName: file.filename,
        },
      });

      const isBanPending = await isAccountAdminRole(
        this.prisma,
        requestAccount,
      );

      const [banEndDay, banEndMonth, banEndYear] =
        createBannedPersonDto.banDetails_banEndDate.split('-');

      const venueIds = createBannedPersonDto.banDetails_venueBanIds
        .split(',')
        .map((ids: string) => {
          return Number(ids);
        });

      const dateNow = dayjs();

      venueIds.map(async (venueId: number) => {
        await this.prisma.banDetail.create({
          data: {
            banDetails_bannedPersonId: newBanProfile.bannedPerson_id,
            banDetails_reason: createBannedPersonDto.banDetails_reason
              .toLocaleLowerCase()
              .trim(),
            banDetails_banStartDate: `${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
            banDetails_banEndDate: `${banEndDay}-${banEndMonth}-${banEndYear}`,
            banDetails_venueBanId: venueId,
            banDetails_isBanPending: !isBanPending,
            banDetails_banUploadedBy: requestAccount.account_id,
          },
        });
      });

      await this.prisma.alertDetail.create({
        data: {
          alertDetail_bannedPersonId: newBanProfile.bannedPerson_id,
          alertDetail_name: newBanProfile.bannedPerson_name,
          alertDetail_imageName: file.filename,
          alertDetails_alertReason: createBannedPersonDto.banDetails_reason
            .toLocaleLowerCase()
            .trim(),
          alertDetails_startTime: `${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}`,
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
      });

      return this.prisma.bannedPerson.findFirstOrThrow({
        where: {
          bannedPerson_id: newBanProfile.bannedPerson_id,
        },
        include: {
          BanDetail: true,
          AlertDetail: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<
    | string
    | {
        active_bans: (BannedPerson & { BanDetail: BanDetail[] })[];
        non_active_bans: (BannedPerson & { BanDetail: BanDetail[] })[];
      }
  > {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const allBannedPeople = await this.prisma.bannedPerson.findMany({
        include: {
          BanDetail: true,
        },
      });

      const bannedPeopleWithActiveBans = allBannedPeople.filter(
        (bannedPerson: BannedPerson & { BanDetail: BanDetail[] }) => {
          return bannedPerson.BanDetail.some((banDetail: BanDetail) => {
            return dayjs(banDetail.banDetails_banEndDate, 'DD-MM-YYYY').isAfter(
              dayjs(),
              'day',
            );
          });
        },
      );

      const bannedPeeopleWithNonActiveBans = allBannedPeople.filter(
        (bannedPerson: BannedPerson & { BanDetail: BanDetail[] }) => {
          return bannedPerson.BanDetail.some((banDetail: BanDetail) => {
            return dayjs(
              banDetail.banDetails_banEndDate,
              'DD-MM-YYYY',
            ).isBefore(dayjs(), 'day');
          });
        },
      );

      return {
        active_bans: bannedPeopleWithActiveBans,
        non_active_bans: bannedPeeopleWithNonActiveBans,
      };
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOneInfo(
    request: RequestWithAccount,
    id: number,
  ): Promise<
    | string
    | (BannedPerson & { BanDetail: BanDetail[]; AlertDetail: AlertDetail[] })
  > {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      return await this.prisma.bannedPerson.findFirstOrThrow({
        where: {
          bannedPerson_id: id,
        },
        include: {
          BanDetail: true,
          AlertDetail: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOnePhoto(
    request: RequestWithAccount,
    response: ExpressResponse,
    id: number,
  ): Promise<string | StreamableFile> {
    try {
      const bannedPersonProfile =
        await this.prisma.bannedPerson.findFirstOrThrow({
          where: {
            bannedPerson_id: id,
          },
        });

      const file = createReadStream(
        `src\\images\\people\\${bannedPersonProfile.bannedPerson_imageName}`,
      );

      response.set({
        'Content-Type': `image/${bannedPersonProfile.bannedPerson_imageName.split('.')[1]}`,
      });

      return new StreamableFile(file);
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    request: RequestWithAccount,
    file: Express.Multer.File,
    id: number,
    updateBannedPersonDto: UpdateBannedPersonDto,
  ): Promise<string | BannedPerson> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const bannedPersonDetails = await this.prisma.bannedPerson.findFirstOrThrow({
          where: {
            bannedPerson_id: id,
          },
        });

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        const requestAccountVenueManager =
          await this.prisma.venueManager.findMany({
            where: {
              venueManager_accountId: requestAccount.account_id,
            },
          });

        const requestAccountVenueManagerIds = requestAccountVenueManager.map(
          (venueManager: VenueManager) => {
            return venueManager.venueManager_venueId;
          },
        );

        const bannedPersonDetailsWithVenuBan = await this.prisma.bannedPerson.findFirstOrThrow({
            where: {
              bannedPerson_id: id,
            },
            include: {
              VenueBan: {
                where: {
                  venueBan_venueId: { in: requestAccountVenueManagerIds },
                },
              },
            },
          });

        if (bannedPersonDetailsWithVenuBan.VenueBan.length === 0) {
          return 'you do not have permission to access this';
        }
      }

      if (file !== undefined) {
        const filePath = path.join('src\\images\\people', bannedPersonDetails.bannedPerson_imageName)
        await fs.unlink(filePath);
      }

      return this.prisma.bannedPerson.update({
        where: {
          bannedPerson_id: id,
        },
        data: {
          bannedPerson_name: updateBannedPersonDto.bannedPerson_name,
          bannedPerson_imageName:
            file !== undefined
              ? file.filename
              : updateBannedPersonDto.bannedPerson_imagePath,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
