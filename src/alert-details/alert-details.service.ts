import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { AlertDetail } from '@prisma/client';
import { getFullAccountInfoFromEmail } from 'src/utils/utils';

// might need a cron job to delete alerts the next morning (6am maybe)

@Injectable()
export class AlertDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAlertDetailDto: CreateAlertDetailDto,
  ): Promise<AlertDetail | string> {
    try {
      return await this.prisma.alertDetail.create({
        data: {
          alertDetails_bannedPersonId:
            createAlertDetailDto.alertDetailsBannedPersonId,
          alertDetails_businessId: createAlertDetailDto.alertDetailsBusinessId,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAll(uploaderEmail: string): Promise<AlertDetail[] | string> {
    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        uploaderEmail,
      );

      const adminRole = await this.prisma.role.findFirstOrThrow({
        where: {
          role_name: 'admin',
        },
      });

      if (uploaderInfo.role_id !== adminRole.role_id) {
        return 'you do not have permission to access this';
      }

      return await this.prisma.alertDetail.findMany();
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAllByBusiness(id: number): Promise<AlertDetail[] | string> {
    try {
      return await this.prisma.alertDetail.findMany({
        where: {
          alertDetails_businessId: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findOne(id: number): Promise<AlertDetail | string> {
    try {
      return await this.prisma.alertDetail.findFirstOrThrow({
        where: {
          alertDetails_id: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  // async update(id: number, updateAlertDetailDto: UpdateAlertDetailDto) {
  //   return `This action updates a #${id} alertDetail`;
  // }

  async removeAll(): Promise<{ count: number } | string> {
    try {
      return await this.prisma.alertDetail.deleteMany({});
    } catch (error: unknown) {
      return String(error);
    }
  }
}
