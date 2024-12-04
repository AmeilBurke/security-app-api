import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { getAccountInfoFromId, handleError } from 'src/utils';
import dayjs from 'dayjs';
import { Server } from 'socket.io';

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

      let minute;

      if(dateNow.minute() <= 9) {
        minute = `0${dateNow.minute()}`;
      } else {
        minute = dateNow.minute();
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

      console.log(newAlert);

      server.emit('onAlertCreate', {
        alertDetail: newAlert,
        imageName: createAlertDetailDto.fileData,
        fileExtension: fileExtension,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  // findAll() {
  //   return `This action returns all alertDetails`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} alertDetail`;
  // }

  // update(id: number, updateAlertDetailDto: UpdateAlertDetailDto) {
  //   return `This action updates a #${id} alertDetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} alertDetail`;
  // }
}
