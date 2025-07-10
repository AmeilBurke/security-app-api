import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import {
  compressImage,
  getAccountInfoFromId,
  handleError,
  isPrismaResultError,
  noFileReceivedError,
  noRequestAccountError,
} from 'src/utils';
import dayjs from 'dayjs';
import { AlertDetail, Prisma } from '@prisma/client';
import * as fs from 'fs';
import { Cron } from '@nestjs/schedule';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import path from 'path';
import { isNumber } from 'class-validator';

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

      let isValidNumber = false;

      if (
        createAlertDetail.alertDetail_bannedPersonId &&
        !isNaN(Number(createAlertDetail.alertDetail_bannedPersonId))
      ) {
        isValidNumber = true;
      }

      const compressedImagePath = await compressImage(
        file,
        path.join(__dirname, '..', '..', 'images', 'alerts'),
      );

      const newAlertDetail = await this.prisma.alertDetail.create({
        data: {
          alertDetail_bannedPersonId: isValidNumber
            ? Number(createAlertDetail.alertDetail_bannedPersonId)
            : null,
          alertDetail_name: createAlertDetail.alertDetail_name
            .toLocaleLowerCase()
            .trim(),
          alertDetail_imagePath: compressedImagePath,
          alertDetail_alertReason: createAlertDetail.alertDetail_alertReason
            .toLocaleLowerCase()
            .trim(),
          alertDetail_startTime: dayjs().toISOString(),
          alertDetail_alertUploadedBy: requestAccount.account_id,
        },
      });

      try {
        fs.promises.unlink(path.join(file.destination, file.filename));
      } catch (error: unknown) {
        console.log(error);
      }

      newAlertDetail.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path.basename(newAlertDetail.alertDetail_imagePath)}`;
      return newAlertDetail;
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

      const activeBans = await this.prisma.alertDetail.findMany({
        include: {
          Account: {
            select: {
              account_name: true,
            },
          },
        },
      });

      return activeBans.map((person) => {
        person.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path.basename(person.alertDetail_imagePath)}`;
        return person;
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findIndividualActiveBan(
    request: RequestWithAccount,
    alertDetailId: number,
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

      const ban = await this.prisma.alertDetail.findFirstOrThrow({
        where: {
          alertDetail_id: alertDetailId,
        },
        include: {
          Account: {
            select: {
              account_name: true,
            },
          },
        },
      });

      ban.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path.basename(ban.alertDetail_imagePath)}`;
      return ban;
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
        try {
          await fs.promises.unlink(
            alertDetailToBeDeleted.alertDetail_imagePath,
          );
        } catch (error) {
          console.log(`error removing file at: ${file.path}`);
        }
      }

      const newAlertDetail = await this.prisma.alertDetail.update({
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
          alertDetail_alertReason: updateAlertDetailDto.alertDetail_alertReason,
          alertDetail_startTime: dayjs().toISOString(),
          alertDetail_alertUploadedBy: requestAccount.account_id,
        },
      });

      newAlertDetail.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path.basename(newAlertDetail.alertDetail_imagePath)}`;
      return newAlertDetail;
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

      try {
        await fs.promises.unlink(alertDetailToDelete.alertDetail_imagePath);
      } catch (error) {
        console.log(
          `error removing file at: ${alertDetailToDelete.alertDetail_imagePath}`,
        );
      }

      return await this.prisma.alertDetail.delete({
        where: {
          alertDetail_id: alertDetailId,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  // need to double check this

  @Cron('0 0 6 * * *')
  private async cronDeleteAll() {
    try {
      console.log('cron run');
      const allAlertDetails = await this.prisma.alertDetail.findMany();

      allAlertDetails.map(async (alertDetail: AlertDetail) => {
        try {
          await fs.promises.unlink(alertDetail.alertDetail_imagePath);
        } catch (error) {
          console.log(
            `error removing file at: ${alertDetail.alertDetail_imagePath}`,
          );
        }
      });

      await this.prisma.alertDetail.deleteMany();
    } catch (error: unknown) {
      console.log('Cron Error: ');
      console.log(error);
    }
  }
}
