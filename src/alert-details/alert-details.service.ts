import { Injectable } from '@nestjs/common';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { getAccountWithEmail, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';

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

  async remove(id: number, request: RequestWithAccount) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      const allRoles = await this.prisma.role.findMany();

      if (uploaderAccount.account_roleId === allRoles[0].role_id) {
        return await this.prisma.alertDetail.delete({
          where: {
            alertDetails_id: id,
          },
        });
      } else {
        const alertDetailInfo = await this.prisma.alertDetail.findFirstOrThrow({
          where: {
            alertDetails_id: id,
          },
        });

        const businessAccess = await this.prisma.businessAccess.findMany({
          where: {
            businessAccess_accountId: uploaderAccount.account_id,
            businessAccess_businessId: alertDetailInfo.alertDetails_businessId,
          },
        });

        if (businessAccess.length > 0) {
          return await this.prisma.alertDetail.delete({
            where: {
              alertDetails_id: id,
            },
          });
        } else {
          return 'you do not have permission to access this';
        }
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}