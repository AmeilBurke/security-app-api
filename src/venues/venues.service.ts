import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithAccount } from 'src/types';
import {
  getAccountInfoFromId,
  handleError,
  isAccountAdminRole,
} from 'src/utils';
import { Account, BannedPerson, Venue } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    createVenueDto: CreateVenueDto,
  ): Promise<string | Venue> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (file === undefined) {
        return 'you need to upload a photo for the venue';
      }

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        return 'you do not have permission to access this';
      }

      const newVenue = await this.prisma.venue.create({
        data: {
          venue_name: createVenueDto.venue_name.toLocaleLowerCase().trim(),
          venue_imagePath: file.filename,
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

  async findAllVenues(request: RequestWithAccount): Promise<string | Venue[]> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const accountRole = await this.prisma.role.findFirstOrThrow({
        where: {
          role_id: requestAccount.account_roleId,
        },
      });

      if (accountRole.role_name === 'venue manager') {
        return 'you do not have permission to access this';
      }

      const allVenues = await this.prisma.venue.findMany();

      const allVenuesConvertedImage = allVenues.map((venue: Venue) => {
        try {
          const filePath = path.join(
            'src\\images\\venues\\',
            venue.venue_imagePath,
          );
          const fileBuffer = fs.readFileSync(filePath);
          venue.venue_imagePath = fileBuffer.toString('base64');
          return venue;
        } catch (error: unknown) {
          console.log(error);
        }
      });
      return allVenuesConvertedImage;
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllBansForVenue(
    request: RequestWithAccount,
    id: number,
  ): Promise<
    | string
    | {
        bannedPerson_id: number;
        bannedPerson_name: string;
        bannedPerson_imageName: string;
      }[]
  > {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const accountRole = await this.prisma.role.findFirstOrThrow({
        where: {
          role_id: requestAccount.account_roleId,
        },
      });

      const venueBannedAccounts = await this.prisma.bannedPerson.findMany({
        where: {
          VenueBan: {
            some: {
              venueBan_venueId: id,
            },
          },
        },
      });

      const venuBannedAccountBase64Images = venueBannedAccounts.map(
        (bannedPerson: BannedPerson) => {
          try {
            const filePath = path.join(
              'src\\images\\people\\',
              bannedPerson.bannedPerson_imageName,
            );
            const fileBuffer = fs.readFileSync(filePath);
            bannedPerson.bannedPerson_imageName = fileBuffer.toString('base64');
            return bannedPerson;
          } catch (error: unknown) {
            console.log(error);
          }
        },
      );

      return venuBannedAccountBase64Images;
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    request: RequestWithAccount,
    file: Express.Multer.File,
    id: number,
    updateVenueDto: UpdateVenueDto,
  ): Promise<string | Venue> {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      const accountRole = await this.prisma.role.findFirstOrThrow({
        where: {
          role_id: requestAccount.account_roleId,
        },
      });

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        const venueManagers = await this.prisma.venueManager.findMany({
          where: {
            venueManager_accountId: requestAccount.account_id,
          },
        });

        if (venueManagers.length === 0) {
          return 'you do not have permission to access this';
        }
      }

      return await this.prisma.venue.update({
        where: {
          venue_id: id,
        },
        data: {
          venue_name: updateVenueDto.venue_name,
          venue_imagePath:
            file !== undefined ? file.filename : updateVenueDto.venue_imagePath,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(request: RequestWithAccount, id: number) {
    try {
      if (!request.account) {
        return 'There was an unspecified error';
      }

      const requestAccount = await getAccountInfoFromId(
        this.prisma,
        request.account.sub,
      );

      if (typeof requestAccount === 'string') {
        return 'there was an error with requestAccount';
      }

      if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
        return 'you do not have permission to access this';
      }

      const deletedBanDetails = await this.prisma.banDetail.deleteMany({
        where: {
          banDetails_venueBanId: id,
        },
      });

      const deletedVenueBans = await this.prisma.venueBan.deleteMany({
        where: {
          venueBan_venueId: id,
        },
      });

      const deletedVenueAccess = await this.prisma.venueAccess.deleteMany({
        where: {
          venueAccess_venueId: id,
        },
      });

      console.log(`${deletedBanDetails.count} related ban details deleted`);
      console.log(`${deletedVenueBans.count} related venue bans deleted`);
      console.log(`${deletedVenueAccess.count} related venue access deleted`);

      return await this.prisma.venue.delete({
        where: {
          venue_id: id,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
