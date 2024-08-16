import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/prisma.service';
import { getFullAccountInfoFromEmail } from 'src/utils/utils';
import { Business } from '@prisma/client';
import { TypeBusinessWithVenues } from 'src/types/types';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business | string> {
    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        createBusinessDto.uploaderEmail,
      );

      const adminRole = await this.prisma.role.findFirstOrThrow({
        where: {
          role_name: 'admin',
        },
      });

      if (uploaderInfo.role_id !== adminRole.role_id) {
        return 'you do not have permission to access this';
      }

      // need file for image
      return await this.prisma.business.create({
        data: {
          business_name: createBusinessDto.businessName,
          business_logo: 'placeholder value',
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAll(uploaderEmail: string): Promise<Business[] | string> {
    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        uploaderEmail,
      );

      const adminRole = await this.prisma.role.findFirstOrThrow({
        where: {
          role_name: 'admin',
        },
      });

      if (uploaderInfo.role_id !== adminRole.role_id) {
        return 'you do not have permission to access this';
      }

      return await this.prisma.business.findMany();
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAllByIds(ids: number[]): Promise<Business[] | string> {
    return await this.prisma.business.findMany({
      where: {
        business_id: { in: ids },
      },
    });
  }

  // need to check businessAccess to see if they can access this
  async findOne(id: number): Promise<Business | string> {
    try {
      return await this.prisma.business.findFirstOrThrow({
        where: {
          business_id: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  // need to check for venue owners to see if they can access this
  async findOneWithVenues(id: number): Promise<TypeBusinessWithVenues | string> {
    try {
      return await this.prisma.business.findFirstOrThrow({
        where: {
          business_id: id,
        },
        include: {
          Venue: true,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async update(
    id: number,
    updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business | string> {
    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        updateBusinessDto.uploaderEmail,
      );

      const adminRole = await this.prisma.role.findFirstOrThrow({
        where: { role_name: 'admin' },
      });

      if (uploaderInfo.role_id !== adminRole.role_id) {
        return 'you do not have permission to access this';
      }

      return this.prisma.business.update({
        where: {
          business_id: id,
        },
        data: {
          business_name: updateBusinessDto.businessName,
          business_logo: 'need to add file uploads',
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async remove(id: number, uploaderEmail: string): Promise<Business | string> {
    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        uploaderEmail,
      );

      const adminRole = await this.prisma.role.findFirstOrThrow({
        where: { role_name: 'admin' },
      });

      if (uploaderInfo.role_id !== adminRole.role_id) {
        return 'you do not have permission to access this';
      }

      return this.prisma.business.delete({
        where: {
          business_id: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }
}
