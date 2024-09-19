import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { RequestWithAccount } from 'src/types';
import { getAccountWithEmail, getRoleFromDB, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { Business, BusinessAccess } from '@prisma/client';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    createBusinessDto: CreateBusinessDto,
  ) {
    try {
      if (file === undefined) {
        createBusinessDto.business_logo = 'undefined';
      }

      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        return await this.prisma.business.create({
          data: {
            business_name: createBusinessDto.business_name,
            business_logo: file.filename,
          },
        });
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllByAccess(request: RequestWithAccount) {
    try {
      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        return await this.prisma.business.findMany();
      }

      const businessAccessForUploader =
        await this.prisma.businessAccess.findMany({
          where: {
            businessAccess_accountId: uploaderAccount.account_id,
          },
        });

      const businessAccessIds = businessAccessForUploader.map(
        (businesses: BusinessAccess) => {
          return businesses.businessAccess_businessId;
        },
      );

      return this.prisma.business.findMany({
        where: {
          business_id: { in: businessAccessIds },
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    request: RequestWithAccount,
    file: Express.Multer.File,
    updateBusinessDto: UpdateBusinessDto,
  ) {
    try {
      const uploaderAccount = await this.prisma.account.findFirstOrThrow({
        where: {
          account_email: request.account.email,
        },
      });

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');
      const businessManagerRole = await getRoleFromDB(
        this.prisma,
        'business manager',
      );

      let accountCanEdit = false;

      if (uploaderAccount.account_roleId === businessManagerRole.role_id) {
        const businessWithBusinessAccess =
          await this.prisma.business.findFirstOrThrow({
            where: {
              business_id: id,
            },
            include: {
              BusinessAccess: {
                where: {
                  businessAccess_accountId: uploaderAccount.account_id,
                },
              },
            },
          });

        if (businessWithBusinessAccess.BusinessAccess.length === 0) {
          return 'you do not have permission to access this';
        }
        accountCanEdit = true;
      }

      if (uploaderAccount.account_id === adminRole.role_id || accountCanEdit) {
        return await this.prisma.business.update({
          where: {
            business_id: id,
          },
          data: {
            business_name: updateBusinessDto.business_name,
            business_logo:
              file !== undefined
                ? file.filename
                : updateBusinessDto.business_logo,
          },
        });
      }

      return await this.prisma.business.update({
        where: {
          business_id: id,
        },
        data: {
          business_name: updateBusinessDto.business_name,
          business_logo:
            file !== undefined
              ? file.filename
              : updateBusinessDto.business_logo,
        },
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

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');

      if (uploaderAccount.account_roleId === adminRole.role_id) {
        const deleteAlertDetails = this.prisma.alertDetail.deleteMany({
          where: {
            alertDetails_businessId: id,
          },
        });

        const deleteBusinessAccess = this.prisma.businessAccess.deleteMany({
          where: {
            businessAccess_businessId: id,
          },
        });

        const deleteBusinessManagers = this.prisma.businessManager.deleteMany({
          where: {
            businessManager_businessId: id,
          },
        });

        const deleteBusiness = this.prisma.business.delete({
          where: {
            business_id: id,
          },
        });

        return await this.prisma.$transaction([
          deleteAlertDetails,
          deleteBusinessAccess,
          deleteBusinessManagers,
          deleteBusiness,
        ]);
      } else {
        return 'you do not have permission to do this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
