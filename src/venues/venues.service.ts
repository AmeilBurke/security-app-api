import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { RequestWithAccount } from 'src/types';
import { getAccountWithEmail, getRoleFromDB, handleError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { StringifyOptions } from 'querystring';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  async create(
    request: RequestWithAccount,
    file: Express.Multer.File,
    createVenueDto: CreateVenueDto,
  ) {
    try {
      if (file === undefined) {
        createVenueDto.venue_logo = 'undefined';
      }

      const uploaderAccount = await getAccountWithEmail(
        this.prisma,
        request.account.email,
      );

      if (uploaderAccount === undefined) {
        return 'uploaderAccount is undefined';
      }

      if (typeof createVenueDto.venue_businessId === 'string') {
        createVenueDto.venue_businessId = Number(
          createVenueDto.venue_businessId,
        );
      }

      const adminRole = await getRoleFromDB(this.prisma, 'admin');
      const businessManagerRole = await getRoleFromDB(
        this.prisma,
        'business manager',
      );

      let canUserCreateVenues = false;

      if (uploaderAccount.account_roleId === businessManagerRole.role_id) {
        const uploaderBusinessAccess =
          await this.prisma.businessAccess.findFirstOrThrow({
            where: {
              businessAccess_accountId: uploaderAccount.account_id,
              businessAccess_businessId: createVenueDto.venue_businessId,
            },
          });

        if (typeof uploaderBusinessAccess !== 'string') {
          canUserCreateVenues = true;
        }
      }

      if (canUserCreateVenues === true) {
        const newVenue = await this.prisma.venue.create({
          data: {
            venue_name: createVenueDto.venue_name,
            venue_logo: file.filename,
            venue_businessId: createVenueDto.venue_businessId,
          },
        });

        // need to re-write this

        if (createVenueDto.venue_managerIds) {
          if (typeof createVenueDto.venue_managerIds === 'string') {
            const managerIdsConverted: number[] = JSON.parse(
              createVenueDto.venue_managerIds,
            ).map((toBeConverted: string) => {
              return Number(toBeConverted);
            });

            createVenueDto.venue_managerIds = managerIdsConverted;

            const newManagers = createVenueDto.venue_managerIds.map(
              (accountId: number) => {
                return {
                  venueManager_accountId: accountId,
                  venueManager_venueId: newVenue.venue_id,
                };
              },
            );
            await this.prisma.venueManager.createMany({
              data: newManagers,
            });
          }
        }

        return await this.prisma.venue.findFirstOrThrow({
          where: {
            venue_id: newVenue.venue_id,
          },
          include: {
            VenueManager: true,
          },
        });
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findAllVenuesByBusinessIds(
    req: RequestWithAccount,
    businessIds: { businessIds: number[] },
  ) {
    try {
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async findOne(id: number, request: RequestWithAccount) {
    try {
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    request: RequestWithAccount,
    updateVenueDto: UpdateVenueDto,
  ) {
    try {
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async remove(id: number, request: RequestWithAccount) {
    try {
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
