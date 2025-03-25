import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import {
  getAccountInfoFromId,
  handleError,
  isPrismaResultError,
  noFileReceivedError,
  noRequestAccountError,
} from 'src/utils';
import dayjs from 'dayjs';
import { Server } from 'socket.io';
import { AlertDetail, Prisma } from '@prisma/client';
import * as fs from 'fs';
import { Cron } from '@nestjs/schedule';
import { PrismaResultError, RequestWithAccount } from 'src/types';

@Injectable()
export class AlertDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createAlertDetail: CreateAlertDetailDto,
    file: Express.Multer.File,
  ): Promise<AlertDetail | PrismaResultError> {
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

      return await this.prisma.alertDetail.create({
        data: {
          alertDetail_bannedPersonId:
            createAlertDetail.alertDetail_bannedPersonId,
          alertDetail_name: createAlertDetail.alertDetail_name
            .toLocaleLowerCase()
            .trim(),
          alertDetail_imagePath: file.path,
          alertDetails_alertReason: createAlertDetail.alertDetails_alertReason
            .toLocaleLowerCase()
            .trim(),
          alertDetails_startTime: dayjs().toISOString(),
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<
    | Prisma.AlertDetailGetPayload<{
        include: { Account: { select: { account_name: true } } };
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

      return await this.prisma.alertDetail.findMany({
        include: {
          Account: {
            select: {
              account_name: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    request: RequestWithAccount,
    updateAlertDetailDto: UpdateAlertDetailDto,
    alertDetailId: number,
    file: Express.Multer.File,
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

      if (file) {
        const alertDetailToBeDeleted =
          await this.prisma.alertDetail.findFirstOrThrow({
            where: {
              alertDetail_id: alertDetailId,
            },
          });
        await fs.promises.unlink(alertDetailToBeDeleted.alertDetail_imagePath);
      }

      return await this.prisma.alertDetail.update({
        where: {
          alertDetail_id: alertDetailId,
        },
        data: {
          alertDetail_bannedPersonId: Number(
            updateAlertDetailDto.alertDetail_bannedPersonId,
          ),
          alertDetail_name: updateAlertDetailDto.alertDetail_name,
          alertDetail_imagePath: file
            ? file.path
            : updateAlertDetailDto.alertDetail_imagePath,
          alertDetails_alertReason:
            updateAlertDetailDto.alertDetail_alertReason,
          alertDetails_startTime: dayjs().toISOString(),
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async deleteAll(
    request: RequestWithAccount,
  ): Promise<Prisma.BatchPayload | PrismaResultError> {
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

      const allAlertDetails = await this.prisma.alertDetail.findMany();
      const filePaths = allAlertDetails.map((alertDetail) => {
        return alertDetail.alertDetail_imagePath;
      });

      filePaths.map(async (filePath) => {
        await fs.promises.unlink(filePath);
      });

      return await this.prisma.alertDetail.deleteMany();
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async deleteOne(
    request: RequestWithAccount,
    alertDetailId: number,
  ): Promise<AlertDetail | PrismaResultError> {
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

      const alertDetailToDelete =
        await this.prisma.alertDetail.findFirstOrThrow({
          where: {
            alertDetail_id: alertDetailId,
          },
        });

      await fs.promises.unlink(alertDetailToDelete.alertDetail_imagePath);

      return await this.prisma.alertDetail.delete({
        where: {
          alertDetail_id: alertDetailId,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  // need to test if this works
  @Cron('0 0 6 * * *')
  private async cronDeleteAll() {
    try {
      console.log('cron run');
      await this.prisma.alertDetail.deleteMany();
    } catch (error: unknown) {
      console.log('Cron Error: ')
      console.log(error);
    }
  }
}
