import { Injectable } from '@nestjs/common';
import { CreateVenueBanDto } from './dto/create-venue-ban.dto';
import { RequestWithAccount } from 'src/types';
import {
  getAccountInfoFromId,
  isAccountAdminRole,
  handleError,
} from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { VenueBan } from '@prisma/client';

@Injectable()
export class VenueBansService {
  constructor(private prisma: PrismaService) {}

  // async create(
  //   request: RequestWithAccount,
  //   createVenueBanDto: CreateVenueBanDto,
  // ): Promise<string | VenueBan> {
  //   try {
  //     if (!request.account) {
  //       //console.log(request.account);
  //       return 'There was an unspecified error';
  //     }

  //     const requestAccount = await getAccountInfoFromId(
  //       this.prisma,
  //       request.account.sub,
  //     );

  //     if (typeof requestAccount === 'string') {
  //       return 'there was an error with requestAccount';
  //     }

  //     if (await isAccountAdminRole(this.prisma, requestAccount)) {
  //       return await this.prisma.venueBan.create({
  //         data: {
  //           venueBan_bannedPersonId: createVenueBanDto.venueBan_bannedPersonId,
  //           venueBan_venueId: createVenueBanDto.venueBan_venueId,
  //         },
  //       });
  //     } else {
  //       return 'you do not have permission to access this';
  //     }
  //   } catch (error: unknown) {
  //     return handleError(error);
  //   }
  // }

  // async findAll(request: RequestWithAccount): Promise<string | VenueBan[]> {
  //   try {
  //     if (!request.account) {
  //       //console.log(request.account);
  //       return 'There was an unspecified error';
  //     }

  //     const requestAccount = await getAccountInfoFromId(
  //       this.prisma,
  //       request.account.sub,
  //     );

  //     if (typeof requestAccount === 'string') {
  //       return 'there was an error with requestAccount';
  //     }
  //     return await this.prisma.venueBan.findMany();
  //   } catch (error: unknown) {
  //     return handleError(error);
  //   }
  // }

  // async findOne(request: RequestWithAccount, id: number): Promise<string | VenueBan> {
  //   try {
  //     if (!request.account) {
  //       //console.log(request.account);
  //       return 'There was an unspecified error';
  //     }

  //     const requestAccount = await getAccountInfoFromId(
  //       this.prisma,
  //       request.account.sub,
  //     );

  //     if (typeof requestAccount === 'string') {
  //       return 'there was an error with requestAccount';
  //     }
  //     return await this.prisma.venueBan.findFirstOrThrow({
  //       where: {
  //         venueBan_venueId: id,
  //       },
  //     });
  //   } catch (error: unknown) {
  //     return handleError(error);
  //   }
  // }

  // async remove(request: RequestWithAccount, id: number): Promise<string | VenueBan> {
  //   try {
  //     if (!request.account) {
  //       //console.log(request.account);
  //       return 'There was an unspecified error';
  //     }

  //     const requestAccount = await getAccountInfoFromId(
  //       this.prisma,
  //       request.account.sub,
  //     );

  //     if (typeof requestAccount === 'string') {
  //       return 'there was an error with requestAccount';
  //     }
  //     return await this.prisma.venueBan.delete({
  //       where: {
  //         venueBan_id: id,
  //       },
  //     });
  //   } catch (error: unknown) {
  //     return handleError(error);
  //   }
  // }
}
