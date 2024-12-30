import { Injectable } from '@nestjs/common';
import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { RequestWithAccount } from 'src/types';
import {
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
} from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { VenueAccess } from '@prisma/client';

@Injectable()
export class VenueAccessService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createVenueAccessDto: CreateVenueAccessDto,
  ): Promise<string | VenueAccess> {
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
        return await this.prisma.venueAccess.create({
          data: {
            venueAccess_accountId: createVenueAccessDto.venueAccess_accountId,
            venueAccess_venueId: createVenueAccessDto.venueAccess_venueId,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<string | VenueAccess[]> {
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
        return await this.prisma.venueAccess.findMany();
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOne(
    request: RequestWithAccount,
    id: number,
  ): Promise<string | VenueAccess> {
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
        return await this.prisma.venueAccess.findFirstOrThrow({
          where: {
            venueAccess_id: id,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(
    request: RequestWithAccount,
    id: number,
  ): Promise<string | VenueAccess> {
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
        return await this.prisma.venueAccess.delete({
          where: {
            venueAccess_id: id,
          },
        });
      } else {
        return 'you do not have permission to access this';
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
