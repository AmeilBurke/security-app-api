import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  accountIsUnauthorized,
  getAccountInfoFromId,
  handleError,
  invalidDayJsDate,
  isAccountAdminRole,
  isAccountSecurityRole,
  isPrismaResultError,
  noFileReceivedError,
  noRequestAccountError,
} from 'src/utils';
import dayjs from 'dayjs';
import { BanDetail, BannedPerson, Prisma } from '@prisma/client';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class BannedPeopleService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createBannedPersonDto: CreateBannedPersonDto & {
      banDetails_reason: string;
      banDetails_banEndDate: string;
      banDetails_venueBanIds: string;
    },
    file: Express.Multer.File,
  ): Promise<
    | Prisma.BannedPersonGetPayload<{
        include: { BanDetail: true; AlertDetail: true };
      }>
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      if (!file) {
        return noFileReceivedError();
      }

      if (!dayjs(createBannedPersonDto.banDetails_banEndDate).isValid()) {
        return invalidDayJsDate();
      }

      const isAccountAdmin = await isAccountAdminRole(
        this.prisma,
        requestAccount,
      );

      const newBanProfile = await this.prisma.bannedPerson.create({
        data: {
          bannedPerson_name: createBannedPersonDto.bannedPerson_name
            .toLocaleLowerCase()
            .trim(),
          bannedPerson_imagePath: file.path,
        },
      });

      const currentDateTimeIso = dayjs().toISOString();
      const venueBanIds = createBannedPersonDto.banDetails_venueBanIds
        .split(',')
        .map((venueId) => Number(venueId));

      const createBanDetails = await Promise.all(
        venueBanIds.map(async (venueId) => {
          await this.prisma.banDetail.create({
            data: {
              banDetails_bannedPersonId: newBanProfile.bannedPerson_id,
              banDetails_reason: createBannedPersonDto.banDetails_reason
                .toLocaleLowerCase()
                .trim(),
              banDetails_banStartDate: currentDateTimeIso,
              banDetails_banEndDate:
                createBannedPersonDto.banDetails_banEndDate,
              banDetails_isBanPending: !isAccountAdmin,
              banDetails_banUploadedBy: requestAccount.account_id,
              banDetails_venueBanId: venueId,
            },
          });
        }),
      ).catch((error) => {
        return handleError(error);
      });

      if (isPrismaResultError(createBanDetails)) {
        return createBanDetails;
      }

      await this.prisma.alertDetail.create({
        data: {
          alertDetail_bannedPersonId: newBanProfile.bannedPerson_id,
          alertDetail_imagePath: newBanProfile.bannedPerson_imagePath,
          alertDetail_name: newBanProfile.bannedPerson_name,
          alertDetails_alertReason: createBannedPersonDto.banDetails_reason
            .toLocaleLowerCase()
            .trim(),
          alertDetails_startTime: dayjs().toISOString(),
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
        include: {
          Account: {
            select: {
              account_name: true,
            },
          },
        },
      });

      const copyDestination = path.resolve(
        __dirname,
        '..',
        '..',
        'images',
        'alerts',
        file.filename,
      );

      try {
        await fs.promises.copyFile(file.path, copyDestination);
        console.log(`file copied to ${copyDestination}`);
      } catch (error: unknown) {
        console.log(`error copying file`);
        console.log(error);
      }

      const newBannedPerson = await this.prisma.bannedPerson.findFirst({
        where: {
          bannedPerson_id: newBanProfile.bannedPerson_id,
        },
        include: {
          BanDetail: true,
          AlertDetail: true,
        },
      });

      newBannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${file.filename}`;
      newBannedPerson.AlertDetail.map((alertDetail) => {
        alertDetail.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${file.filename}`;
        return alertDetail;
      });

      return newBannedPerson;
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllBlanketBanned(
    request: RequestWithAccount,
  ): Promise<
    | Prisma.BannedPersonGetPayload<{ include: { BanDetail: true } }>[]
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      const allVenueIds = new Set(
        (
          await this.prisma.venue.findMany({
            select: {
              venue_id: true,
            },
          })
        ).map((venueId) => venueId.venue_id),
      );
      const peopleWithActiveBans = await this.prisma.bannedPerson.findMany({
        where: {
          BanDetail: {
            some: {
              banDetails_banEndDate: { gt: dayjs().toISOString() },
              banDetails_isBanPending: false,
            },
          },
        },
        include: {
          BanDetail: true,
        },
        orderBy: {
          bannedPerson_name: 'asc',
        },
      });

      const filteredBannedPeople = peopleWithActiveBans.filter(
        (bannedPerson: BannedPerson & { BanDetail: BanDetail[] }) => {
          let bannedFromVenueIds = new Set<number>();

          bannedPerson.BanDetail.some((banDetail: BanDetail) => {
            bannedFromVenueIds.add(banDetail.banDetails_venueBanId);
          });

          if (bannedFromVenueIds.size === allVenueIds.size) {
            return bannedPerson;
          }
        },
      );

      return filteredBannedPeople.map(
        (bannedPerson: BannedPerson & { BanDetail: BanDetail[] }) => {
          bannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path.basename(bannedPerson.bannedPerson_imagePath)}`;
          return bannedPerson;
        },
      );
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllByVenueId(
    request: RequestWithAccount,
    venueId: number,
  ): Promise<
    | Prisma.BannedPersonGetPayload<{ include: { BanDetail: true } }>[]
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      return await this.prisma.bannedPerson.findMany({
        where: {
          BanDetail: {
            some: {
              banDetails_venueBanId: venueId,
              banDetails_banEndDate: { gt: dayjs().toISOString() },
              banDetails_isBanPending: false,
            },
          },
        },
        include: {
          BanDetail: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllExpired(
    request: RequestWithAccount,
  ): Promise<
    | Prisma.BannedPersonGetPayload<{ include: { BanDetail: true } }>[]
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      return await this.prisma.bannedPerson.findMany({
        where: {
          BanDetail: {
            every: {
              banDetails_banEndDate: { lt: dayjs().toISOString() },
            },
          },
        },
        include: {
          BanDetail: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllWithActiveAlert(request: RequestWithAccount): Promise<
    | Prisma.BannedPersonGetPayload<{
        include: { AlertDetail: true; BanDetail: true };
      }>[]
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      const peopleWithActiveBans = await this.prisma.bannedPerson.findMany({
        where: {
          AlertDetail: {
            some: {},
          },
        },
        include: {
          AlertDetail: {
            include: {
              Account: {
                select: {
                  account_name: true,
                },
              },
            },
          },

          BanDetail: {
            include: {
              Account: {
                select: {
                  account_name: true,
                },
              },
            },
          },
        },
      });

      return peopleWithActiveBans.map((person) => {
        person.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path.basename(person.bannedPerson_imagePath)}`;
        person.AlertDetail.map((alert) => {
          alert.alertDetail_imagePath = `${process.env.API_URL}/images/people/${path.basename(person.bannedPerson_imagePath)}`;
        });
        return person;
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllWithPendingBans(request: RequestWithAccount): Promise<
    | Prisma.BannedPersonGetPayload<{
        include: {
          BanDetail: { include: { Account: { select: { account_name } } } };
        };
      }>[]
    | PrismaResultError
  > {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      return await this.prisma.bannedPerson.findMany({
        where: {
          BanDetail: {
            some: {
              banDetails_isBanPending: true,
            },
          },
        },
        include: {
          BanDetail: {
            where: {
              banDetails_isBanPending: true,
            },
            include: {
              Account: {
                select: {
                  account_name: true,
                },
              },
            },
          },
        },
        orderBy: {
          bannedPerson_name: 'asc',
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllWithoutPendingBans(
    request: RequestWithAccount,
  ): Promise<any | PrismaResultError> {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      const activeBannedPeople = await this.prisma.bannedPerson.findMany({
        where: {
          BanDetail: {
            every: {
              banDetails_isBanPending: false,
            },
          },
        },
        orderBy: {
          bannedPerson_name: 'asc',
        },
      });

      return activeBannedPeople.map((bannedPerson) => {
        bannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path.basename(bannedPerson.bannedPerson_imagePath)}`;
        return bannedPerson;
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async updateOneBannedPerson(
    request: RequestWithAccount,
    file: Express.Multer.File,
    bannedPersonId: number,
    updateBannedPersonDto: UpdateBannedPersonDto,
  ) {
    try {
      if (!request.account) {
        return noRequestAccountError();
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount;
      }

      if (
        !(await isAccountAdminRole(this.prisma, requestAccount)) &&
        !(await isAccountSecurityRole(this.prisma, requestAccount))
      ) {
        return accountIsUnauthorized();
      }

      const bannedPersonToUpdate = await this.prisma.bannedPerson.findFirst({
        where: {
          bannedPerson_id: bannedPersonId,
        },
      });

      if (isPrismaResultError(bannedPersonToUpdate)) {
        return bannedPersonToUpdate;
      }

      const updatedBannedPerson = await this.prisma.bannedPerson.update({
        where: {
          bannedPerson_id: bannedPersonId,
        },
        data: {
          bannedPerson_name: updateBannedPersonDto.bannedPerson_name,
          bannedPerson_imagePath: file
            ? file.path
            : updateBannedPersonDto.bannedPerson_imagePath,
        },
      });

      updatedBannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path.basename(updatedBannedPerson.bannedPerson_imagePath)}`;

      if (file) {
        try {
          await fs.promises.unlink(bannedPersonToUpdate.bannedPerson_imagePath);
        } catch (error) {
          console.log(`error removing file at: ${file.path}`);
        }
      } else {
      }
      return updatedBannedPerson;
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
