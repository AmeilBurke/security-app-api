import { Injectable } from '@nestjs/common';
import { CreateVenueManagerDto } from './dto/create-venue-manager.dto';
import { UpdateVenueManagerDto } from './dto/update-venue-manager.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import {
  accountIsUnauthorized,
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
  isPrismaResultError,
  noRequestAccountError,
} from 'src/utils';
import { VenueManager } from '@prisma/client';
import { PrismaClientRustPanicError } from '@prisma/client/runtime/library';

@Injectable()
export class VenueManagersService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createVenueManagerDto: CreateVenueManagerDto,
  ): Promise<any> {
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

      return await this.prisma.venueManager.create({
        data: {
          venueManager_accountId: createVenueManagerDto.venueManager_accountId,
          venueManager_venueId: createVenueManagerDto.venueManager_venueId,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAll(request: RequestWithAccount): Promise<any> {
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

      return await this.prisma.venueManager.findMany();
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOne(request: RequestWithAccount, id: number): Promise<any> {
    try {
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    request: RequestWithAccount,
    id: number,
    updateVenueManagerDto: UpdateVenueManagerDto,
  ): Promise<any> {
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

  async remove(request: RequestWithAccount, id: number): Promise<any> {
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

      return await this.prisma.venueManager.delete({
        where: {
          venueManager_id: id,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
