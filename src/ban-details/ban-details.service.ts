import { Injectable } from '@nestjs/common';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import {
  accountIsUnauthorized,
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
  isPrismaResultError,
  noRequestAccountError,
} from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import dayjs from 'dayjs';
import { BanDetail, Prisma, PrismaPromise } from '@prisma/client';

@Injectable()
export class BanDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createBanDetailDto: CreateBanDetailDto,
  ): Promise<Prisma.PrismaPromise<Prisma.BatchPayload> | PrismaResultError> {
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

      let isBanPending: boolean;

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        isBanPending = false;
      } else {
        isBanPending = true;
      }
      const currentDateTimeIso = dayjs().toISOString();

      // const venueBanData = createBanDetailDto.banDetails_venueBanIds.map(
      //   (venueId: number) => {
      //     return {
      //       venueBan_bannedPersonId:
      //         createBanDetailDto.banDetails_bannedPersonId,
      //       venueBan_venueId: venueId,
      //     };
      //   },
      // );

      const banDetailsData = createBanDetailDto.banDetails_venueBanIds.map(
        (venueId: number) => {
          return {
            banDetails_bannedPersonId:
              createBanDetailDto.banDetails_bannedPersonId,
            banDetails_reason: createBanDetailDto.banDetails_reason
              .toLocaleLowerCase()
              .trim(),
            banDetails_banStartDate: currentDateTimeIso,
            banDetails_banEndDate: createBanDetailDto.banDetails_banEndDate,
            banDetails_venueBanId: venueId,
            banDetails_isBanPending: isBanPending,
            banDetails_banUploadedBy: requestAccount.account_id,
          };
        },
      );

      // await this.prisma.venueBan.createMany({
      //   data: venueBanData,
      // });

      return await this.prisma.banDetail.createMany({
        data: banDetailsData,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findBanDetailsByAccountId(
    request: RequestWithAccount,
    accountId: number,
  ): Promise<BanDetail | PrismaResultError> {
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

      return await this.prisma.banDetail.findFirstOrThrow({
        where: {
          banDetails_bannedPersonId: accountId,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async updateIndividualBanDetail(
    request: RequestWithAccount,
    id: number,
    updateBanDetailDto: UpdateIndividualBanDetailDto,
  ): Promise<BanDetail | PrismaResultError> {
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

      return await this.prisma.banDetail.update({
        where: {
          banDetails_id: id,
        },
        data: {
          banDetails_reason: updateBanDetailDto.banDetails_reason
            .toLocaleLowerCase()
            .trim(),
          banDetails_banStartDate: updateBanDetailDto.banDetails_banStartDate,
          banDetails_banEndDate: updateBanDetailDto.banDetails_banEndDate,
          banDetails_isBanPending: (await isAccountAdminRole(
            this.prisma,
            requestAccount,
          ))
            ? false
            : true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(
    request: RequestWithAccount,
    id: number,
  ): Promise<BanDetail | PrismaResultError> {
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

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return await this.prisma.banDetail.delete({
          where: {
            banDetails_id: id,
          },
        });
      } else {
        return accountIsUnauthorized();
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
