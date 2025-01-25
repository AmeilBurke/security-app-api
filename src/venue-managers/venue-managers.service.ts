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
import { VenueManager } from '@prisma/client';

@Injectable()
export class VenueManagersService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    createVenueManagerDto: CreateVenueManagerDto,
  ): Promise<string | VenueManager> {
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

  async findAll(request: RequestWithAccount): Promise<string | VenueManager[]> {
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

  async findOne(
    request: RequestWithAccount,
    id: number,
  ): Promise<string | VenueManager> {
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

  async findOneByVenueID(
    request: RequestWithAccount,
    venueId: number,
  ): Promise<
    | string
    | { account_id: number; account_email: string; account_name: string }[]
  > {
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

    const venueManagerIds = await this.prisma.venueManager.findMany({
      where: {
        venueManager_venueId: venueId,
      },
      select: {
        venueManager_accountId: true,
        venue_id: true,
      },
    });

    return await this.prisma.account.findMany({
      where: {
        VenueManager: {
          some: {
            venueManager_venueId: venueId,
          },
        },
      },
      select: {
        account_id: true,
        account_email: true,
        account_name: true,
      },
    });
  }

  async update(
    request: RequestWithAccount,
    id: number,
    updateVenueManagerDto: UpdateVenueManagerDto,
  ): Promise<string | VenueManager> {
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

  async remove(
    request: RequestWithAccount,
    id: number,
  ): Promise<string | VenueManager> {
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
