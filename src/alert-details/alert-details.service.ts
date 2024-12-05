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

@Injectable()
export class AlertDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: { sub: number; email: string; iat: number; exp: number },
    createAlertDetailDto: CreateAlertDetailDto & { fileData: string },
    imageName: string,
    fileExtension: string,
    server: Server,
  ) {
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
          alertDetail_bannedPersonId: createAlertDetailDto.alertDetail_bannedPersonId,
          alertDetail_name: createAlertDetailDto.alertDetail_name,
          alertDetail_imageName: imageName,
          alertDetails_alertReason: createAlertDetailDto.alertDetails_alertReason,
          alertDetails_startTime: `${dateNow.hour()}:${minute} ${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
          alertDetails_alertUploadedBy: requestAccount.account_id,
        },
      });

      const allAlerts = await this.prisma.alertDetail.findMany();

      const alertsWithBase64Image = allAlerts.map((alertDetail: AlertDetail) => {
        try {
          const filePath = path.join('src\\images\\people\\', alertDetail.alertDetail_imageName);
          const fileBuffer = fs.readFileSync(filePath);
          alertDetail.alertDetail_imageName = fileBuffer.toString('base64');
          return alertDetail;
        } catch (error: unknown) {
          if(error instanceof Error) {
            console.log(error.message);
          }
        }
      });

      server.emit('onAlertCreate', {
        allAlerts: alertsWithBase64Image,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  // do the same as create, but just update instead
  
  // update(id: number, updateAlertDetailDto: UpdateAlertDetailDto) {
  //   return `This action updates a #${id} alertDetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} alertDetail`;
  // }
}
