import { Injectable } from '@nestjs/common';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BanDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(createBanDetailDto: CreateBanDetailDto) {
    try {
      return await this.prisma.banDetail.create({
        data: {
          banDetail_reason: createBanDetailDto.banDetailReason
            .toLocaleLowerCase()
            .trim(),
          banDetail_startDate: createBanDetailDto.banDetailStartDate,
          banDetail_endDate: createBanDetailDto.banDetailEndDate,
          bannedPerson_id: createBanDetailDto.bannedPersonId,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.banDetail.findMany();
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findOne(id: number) {
    return await this.prisma.banDetail.findFirstOrThrow({
      where: {
        banDetail_id: id,
      },
    });
  }

  async update(id: number, updateBanDetailDto: UpdateBanDetailDto) {
    try {
      return await this.prisma.banDetail.update({
        where: {
          banDetail_id: id,
        },
        data: {
          banDetail_reason: updateBanDetailDto.banDetailReason,
          banDetail_startDate: updateBanDetailDto.banDetailStartDate,
          banDetail_endDate: updateBanDetailDto.banDetailEndDate,
          bannedPerson_id: updateBanDetailDto.bannedPersonId,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.banDetail.delete({
        where: {
          banDetail_id: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }
}
