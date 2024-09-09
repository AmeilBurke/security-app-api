import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlertDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlertDetailDto: CreateAlertDetailDto) {
    try {
      return await this.prisma.alertDetail.create({
        data: createAlertDetailDto,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(id: number) {
    return await this.prisma.alertDetail.delete({
      where: {
        alertDetails_id: id,
      },
    });
  }
}
