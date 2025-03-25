import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import {
  accountIsUnauthorized,
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
  isAccountSecurityRole,
  isPrismaResultError,
  noFileReceivedError,
  noRequestAccountError,
} from 'src/utils';
import { Account, BannedPerson, Venue, Prisma } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaResultError } from 'src/types';
import { Response } from 'express';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    createVenueDto: CreateVenueDto,
  ): Promise<Venue | PrismaResultError> {
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

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        return accountIsUnauthorized();
      }

      const newVenue = await this.prisma.venue.create({
        data: {
          venue_name: createVenueDto.venue_name.toLocaleLowerCase().trim(),
          venue_imagePath: file.path,
        },
      });

      const adminAndSecurityRole = await this.prisma.role.findMany({
        select: {
          role_id: true,
        },
        where: {
          OR: [
            {
              role_name: 'admin',
            },
            {
              role_name: 'security',
            },
          ],
        },
      });

      const adminAndSecurityRoleIds = adminAndSecurityRole.map(
        (roleId: { role_id: number }) => roleId.role_id,
      );

      const adminAndSecurityAccounts = await this.prisma.account.findMany({
        where: {
          account_roleId: {
            in: adminAndSecurityRoleIds,
          },
        },
      });

      const venueAccessData = adminAndSecurityAccounts.map(
        (account: Account) => {
          return {
            venueAccess_venueId: newVenue.venue_id,
            venueAccess_accountId: account.account_id,
          };
        },
      );

      await this.prisma.venueAccess.createMany({
        data: venueAccessData,
      });

      return newVenue;
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllvenues(
    request: RequestWithAccount,
  ): Promise<
    | Prisma.VenueGetPayload<{ include: { VenueManager: true } }>[]
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

      if (
        (await isAccountAdminRole(this.prisma, requestAccount)) ||
        (await isAccountSecurityRole(this.prisma, requestAccount))
      ) {
        return await this.prisma.venue.findMany({
          include: {
            VenueManager: true,
          },
        });
      }

      const venueAccess = (
        await this.prisma.account.findFirst({
          where: {
            account_id: requestAccount.account_id,
          },
          include: {
            VenueAccess: true,
          },
        })
      ).VenueAccess.map((venueAccess) => venueAccess.venueAccess_venueId);

      return await this.prisma.venue.findMany({
        where: {
          venue_id: {
            in: venueAccess,
          },
        },
        include: {
          VenueManager: true,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async updateOneVenue(
    request: RequestWithAccount,
    file: Express.Multer.File,
    venueId: number,
    updateVenueDto: UpdateVenueDto,
  ): Promise<Venue | PrismaResultError> {
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

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        return accountIsUnauthorized();
      }

      const venueToUpdate = await this.prisma.venue.findFirst({
        where: {
          venue_id: venueId,
        },
      });

      if (file) {
        fs.unlink(venueToUpdate.venue_imagePath, (error) => console.log(error));
      }

      return await this.prisma.venue.update({
        where: {
          venue_id: venueId,
        },
        data: {
          venue_imagePath: file ? file.path : updateVenueDto.venue_imagePath,
          venue_name: updateVenueDto.venue_name,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async deleteOneVenue(
    request: RequestWithAccount,
    venueId: number,
  ): Promise<Venue | PrismaResultError> {
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

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        return accountIsUnauthorized();
      }

      const venueToBeDeleted = await this.prisma.venue.findFirstOrThrow({
        where: {
          venue_id: venueId,
        },
      });

      try {
        await fs.promises.unlink(venueToBeDeleted.venue_imagePath);
      } catch (error) {
        console.log(error);
      }

      await this.prisma.banDetail.deleteMany({
        where: {
          banDetails_venueBanId: venueId,
        },
      });

      await this.prisma.venueAccess.deleteMany({
        where: {
          venueAccess_venueId: venueId,
        },
      });

      return await this.prisma.venue.delete({
        where: {
          venue_id: venueId,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
