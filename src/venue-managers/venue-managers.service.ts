import { Injectable } from '@nestjs/common';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import {
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
} from 'src/utils';

@Injectable()
export class VenueManagersService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createVenueManagerDto: CreateVenueManagerDto,
  ) {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return await this.prisma.venueManager.create({
          data: {
            venueManager_accountId:
              createVenueManagerDto.venueManager_accountId,
            venueManager_venueId: createVenueManagerDto.venueManager_venueId,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount) {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }
      return await this.prisma.venueManager.findMany();
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOne(request: RequestWithAccount, id: number) {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      return await this.prisma.venueManager.findFirstOrThrow({
        where: {
          venueManager_id: id,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    request: RequestWithAccount,
    id: number,
    updateVenueManagerDto: UpdateVenueManagerDto,
  ) {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      return await this.prisma.venueManager.update({
        where: {
          venueManager_id: id,
        },
        data: {
          venueManager_accountId: updateVenueManagerDto.venueManager_accountId,
          venueManager_venueId: updateVenueManagerDto.venueManager_venueId,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(request: RequestWithAccount, id: number) {
    try {
      if (!request.account) {
        console.log(request.account);
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }
      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return await this.prisma.venueManager.delete({
          where: {
            venueManager_id: id,
          },
        });
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
