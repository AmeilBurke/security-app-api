import { Injectable } from '@nestjs/common';
import { CreateVenueAccessDto } from './dto/create-venue-access.dto';
import { PrismaResultError, RequestWithAccount } from 'src/types';
import {
  accountIsUnauthorized,
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
  isPrismaResultError,
  noRequestAccountError,
} from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { VenueAccess } from '@prisma/client';

@Injectable()
export class VenueAccessService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createVenueAccessDto: CreateVenueAccessDto,
  ): Promise<VenueAccess | PrismaResultError> {
    try {
      if (!request.account) {
        return noRequestAccountError()
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return await this.prisma.venueAccess.create({
          data: {
            venueAccess_accountId: createVenueAccessDto.venueAccess_accountId,
            venueAccess_venueId: createVenueAccessDto.venueAccess_venueId,
          },
        });
      } else {
        return accountIsUnauthorized()
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(
    request: RequestWithAccount,
    id: number,
  ): Promise<VenueAccess | PrismaResultError> {
    try {
      if (!request.account) {
        return noRequestAccountError()
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (isPrismaResultError(requestAccount)) {
        return requestAccount
      }

      if (await isAccountAdminRole(this.prisma, requestAccount)) {
        return await this.prisma.venueAccess.delete({
          where: {
            venueAccess_id: id,
          },
        });
      } else {
        return accountIsUnauthorized()
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
