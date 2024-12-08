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
import { Venue } from '@prisma/client';

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

      return await this.prisma.venue.create({
        data: {
          venue_name: createVenueDto.venue_name.toLocaleLowerCase().trim(),
          venue_imagePath: file.filename,
        },
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  findAll() {
    return `This action returns all venues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
