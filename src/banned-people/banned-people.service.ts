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
  VenueManager,
} from '@prisma/client';
import path from 'path';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import * as fs from 'fs';
import { Server } from 'socket.io';

@Injectable()
export class BannedPeopleService {
  constructor(private prisma: PrismaService) {}
  async create(
    payload: { sub: number; email: string; iat: number; exp: number },
    createBannedPersonDto: CreateBannedPersonDto & {
      fileData: string;
      banDetails: {
        banDetails_reason: string;
        banDetails_banEndDate: string;
        banDetails_venueBanIds: number[];
      };
    },
    imageName: string,
    server: Server,
  ): Promise<string | void> {
    try {
      if (!payload.sub) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        payload.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const newBanProfile = await this.prisma.bannedPerson.create({
        data: {
          bannedPerson_name: createBannedPersonDto.bannedPerson_name
            .toLocaleLowerCase()
            .trim(),
          bannedPerson_imageName: imageName,
        },
      });

      const isBanPending = await isAccountAdminRole(
        this.prisma,
        requestAccount,
      );

      const [banEndDay, banEndMonth, banEndYear] =
        createBannedPersonDto.banDetails.banDetails_banEndDate.split('-');

      const dateNow = dayjs();

      createBannedPersonDto.banDetails.banDetails_venueBanIds.map(
        async (venueId: number) => {
          await this.prisma.banDetail.create({
            data: {
              banDetails_bannedPersonId: newBanProfile.bannedPerson_id,
              banDetails_reason:
                createBannedPersonDto.banDetails.banDetails_reason
                  .toLocaleLowerCase()
                  .trim(),
              banDetails_banStartDate: `${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
              banDetails_banEndDate: `${banEndDay}-${banEndMonth}-${banEndYear}`,
              banDetails_venueBanId: venueId,
              banDetails_isBanPending: !isBanPending,
              banDetails_banUploadedBy: requestAccount.account_id,
            },
          });
        },
      );

      createBannedPersonDto.banDetails.banDetails_venueBanIds.map(
        async (venueIds: number) => {
          await this.prisma.venueBan.create({
            data: {
              venueBan_bannedPersonId: newBanProfile.bannedPerson_id,
              venueBan_venueId: venueIds,
            },
          });
        },
      );

      await this.prisma.alertDetail.create({
        data: {
          alertDetail_bannedPersonId: newBanProfile.bannedPerson_id,
          alertDetail_name: newBanProfile.bannedPerson_name,
          alertDetail_imageName: imageName,
          alertDetails_alertReason:
            createBannedPersonDto.banDetails.banDetails_reason
              .toLocaleLowerCase()
              .trim(),
          alertDetails_startTime: `${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}`,
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
      });

      const allAlerts = await this.prisma.alertDetail.findMany();

      const alertsWithBase64Image = allAlerts.map(
        (alertDetail: AlertDetail) => {
          try {
            const filePath = path.join(
              'src\\images\\people\\',
              alertDetail.alertDetail_imageName,
            );
            const fileBuffer = fs.readFileSync(filePath);
            alertDetail.alertDetail_imageName = fileBuffer.toString('base64');
            return alertDetail;
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.log(error.message);
            }
          }
        },
      );

      server.emit('onBanCreate', {
        allAlerts: alertsWithBase64Image,
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

      const allBannedPeopleWithImages = allBannedPeople.map(
        (bannedPerson: BannedPerson & { BanDetail: BanDetail[] }) => {
          try {
            const filePath = path.join(
              'src\\images\\people\\',
              bannedPerson.bannedPerson_imageName,
            );
            const fileBuffer = fs.readFileSync(filePath);
            bannedPerson.bannedPerson_imageName = fileBuffer.toString('base64');
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.log(error.message);
              bannedPerson.bannedPerson_imageName === 'undefined';
            }
          }
          return bannedPerson;
        },
      );

      const bannedPeopleWithActiveBans = allBannedPeopleWithImages.filter(
        (bannedPerson: BannedPerson & { BanDetail: BanDetail[] }) => {
          return bannedPerson.BanDetail.some((banDetail: BanDetail) => {
            return dayjs(banDetail.banDetails_banEndDate, 'DD-MM-YYYY').isAfter(
              dayjs(),
              'day',
            );
          });
        },
      );

      const bannedPeopleWithNonActiveBans = allBannedPeople.filter(
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
        non_active_bans: bannedPeopleWithNonActiveBans,
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

      const bannedPersonDetails =
        await this.prisma.bannedPerson.findFirstOrThrow({
          where: {
            bannedPerson_id: id,
          },
          include: {
            BanDetail: true,
            AlertDetail: true,
          },
        });

      try {
        const filePath = path.join(
          'src\\images\\people\\',
          bannedPersonDetails.bannedPerson_imageName,
        );
        const fileBuffer = fs.readFileSync(filePath);
        bannedPersonDetails.bannedPerson_imageName =
          fileBuffer.toString('base64');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }

      return bannedPersonDetails;
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

      const bannedPersonDetails =
        await this.prisma.bannedPerson.findFirstOrThrow({
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

        const bannedPersonDetailsWithVenuBan =
          await this.prisma.bannedPerson.findFirstOrThrow({
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
        const filePath = path.join(
          'src\\images\\people',
          bannedPersonDetails.bannedPerson_imageName,
        );
        fs.unlink(filePath, () => {});
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
