import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { getAccountInfoFromId, handleError } from 'src/utils';
import dayjs from 'dayjs';
import { Server } from 'socket.io';
import { AlertDetail } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { Cron } from '@nestjs/schedule';
import { RequestWithAccount } from 'src/types';

@Injectable()
export class AlertDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: { sub: number; email: string; iat: number; exp: number },
    createAlertDetailDto: CreateAlertDetailDto & { fileData: string },
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

      const dateNow = dayjs();

      let minute: string;

      if (dateNow.minute() <= 9) {
        minute = `0${dateNow.minute()}`;
      } else {
        minute = String(dateNow.minute());
      }

      const newAlert = await this.prisma.alertDetail.create({
        data: {
          alertDetail_bannedPersonId:
            createAlertDetailDto.alertDetail_bannedPersonId,
          alertDetail_name: createAlertDetailDto.alertDetail_name,
          alertDetail_imageName: imageName,
          alertDetails_alertReason:
            createAlertDetailDto.alertDetails_alertReason,
          alertDetails_startTime: `${dateNow.hour()}:${minute} ${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
      });

      const latestAlert = await this.prisma.alertDetail.findUniqueOrThrow({
        where: {
          alertDetail_id: newAlert.alertDetail_id,
        },
        include: {
          account_id: true,
        },
      });

      console.log(latestAlert);
      try {
        const filePath = path.join(
          'src\\images\\people\\',
          latestAlert.alertDetail_imageName,
        );
        const fileBuffer = fs.readFileSync(filePath);
        latestAlert.alertDetail_imageName = fileBuffer.toString('base64');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }

      server.emit('onAlertCreate', {
        latestAlert: latestAlert,
        latestAlertTime: `${dateNow.date()}/${dateNow.month() + 1}/${dateNow.year()}T${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}:${dateNow.millisecond()}`,
      });

      console.log({
        latestAlert: latestAlert,
        latestAlertTime: `${dateNow.date()}/${dateNow.month() + 1}/${dateNow.year()}T${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}:${dateNow.millisecond()}`,
      });

      // const allAlerts = await this.prisma.alertDetail.findMany();

      // const alertsWithBase64Image = allAlerts.map(
      //   (alertDetail: AlertDetail) => {
      //     try {
      //       const filePath = path.join(
      //         'src\\images\\people\\',
      //         alertDetail.alertDetail_imageName,
      //       );
      //       const fileBuffer = fs.readFileSync(filePath);
      //       alertDetail.alertDetail_imageName = fileBuffer.toString('base64');
      //       return alertDetail;
      //     } catch (error: unknown) {
      //       if (error instanceof Error) {
      //         console.log(error.message);
      //       }
      //     }
      //   },
      // );

      // server.emit('onAlertCreate', {
      //   allAlerts: alertsWithBase64Image,
      // });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    payload: { sub: number; email: string; iat: number; exp: number },
    updateAlertDetailDto: UpdateAlertDetailDto,
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

      await this.prisma.alertDetail.update({
        where: {
          alertDetail_id: updateAlertDetailDto.alertDetail_id,
        },
        data: {
          alertDetail_name: updateAlertDetailDto.alertDetail_name,
          alertDetail_imageName:
            imageName === ''
              ? updateAlertDetailDto.alertDetail_imageName
              : imageName,
          alertDetails_alertReason:
            updateAlertDetailDto.alertDetail_alertReason,
        },
      });

      const allAlerts = await this.prisma.alertDetail.findMany();

      server.emit('onAlertUpdate', {
        allAlerts: allAlerts,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<AlertDetail[] | string> {
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

    return await this.prisma.alertDetail.findMany();
  }

  //TODO: test this
  //needs fixing, produces error:
  //TypeError: Cannot read properties of undefined (reading 'emit')
  // at AlertDetailsService.remove (C:\Users\ameil\Documents\Github Repositories\security-app-api\src\alert-details\alert-details.service.ts:191:14)
  // at async CronJob.<anonymous> (C:\Users\ameil\Documents\Github Repositories\security-app-api\node_modules\@nestjs\schedule\dist\schedule.explorer.js:119:17)

  @Cron('0 6 * * *')
  async remove(server: Server): Promise<string | void> {
    try {
      await this.prisma.alertDetail.deleteMany();

      server.emit('onAlertUpdate', {
        allAlerts: [],
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
