import { Injectable } from '@nestjs/common';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateIndividualBanDetailDto } from './dto/update-individual-ban-detail.dto';
import { RequestWithAccount } from 'src/types';
import {
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
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
  ): Promise<string | Prisma.PrismaPromise<Prisma.BatchPayload>> {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      let isBanPending: boolean;

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        isBanPending = false;
      } else {
        isBanPending = true;
      }

      const dateNow = dayjs();
      const [banEndDay, banEndMonth, banEndYear] =
        createBanDetailDto.banDetails_banEndDate.split('-');

      const banDetailsData = createBanDetailDto.banDetails_venueBanIds.map(
        (venueId: number) => {
          return {
            banDetails_bannedPersonId:
              createBanDetailDto.banDetails_bannedPersonId,
            banDetails_reason: createBanDetailDto.banDetails_reason
              .toLocaleLowerCase()
              .trim(),
            banDetails_banStartDate: `${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
            banDetails_banEndDate: `${banEndDay}-${banEndMonth}-${banEndYear}`,
            banDetails_venueBanId: venueId,
            banDetails_isBanPending: isBanPending,
            banDetails_banUploadedBy: requestAccount.account_id,
          };
        },
      );

      return await this.prisma.banDetail.createMany({
        data: banDetailsData,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<string | { active_bans: BanDetail[]; non_active_bans: BanDetail[] | null }> {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(this.prisma, request.account.sub);

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const allBanDetails = await this.prisma.banDetail.findMany();

      const activeBans = allBanDetails.filter((banDetail: BanDetail) => {
        return banDetail.banDetails_isBanPending === false;
      });

      const nonActiveBans = allBanDetails.filter((banDetail: BanDetail) => {
        return banDetail.banDetails_isBanPending === true;
      });

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return {
          active_bans: activeBans,
          non_active_bans: nonActiveBans,
        };
      } else {
        return {
          active_bans: activeBans,
          non_active_bans: null,
        };
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findBanDetailsByAccountId(
    request: RequestWithAccount,
    accountId: number,
  ): Promise<string | BanDetail> {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
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
  ): Promise<string | BanDetail> {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
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
  ): Promise<string | BanDetail> {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return await this.prisma.banDetail.delete({
          where: {
            banDetails_id: id,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
