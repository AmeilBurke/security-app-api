import { Injectable } from '@nestjs/common';
import { CreateBanDetailDto } from './dto/create-ban-detail.dto';
import { UpdateBanDetailDto } from './dto/update-ban-detail.dto';
import { PrismaService } from 'src/prisma.service';
import {
  getFullAccountInfoFromEmail,
  getSecurityRoleFromDB,
} from 'src/utils/utils';
import { BanDetail } from '@prisma/client';

@Injectable()
export class BanDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(createBanDetailDto: CreateBanDetailDto): Promise<BanDetail | string> {
    try {
      let isBanPending = false;

      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        createBanDetailDto.uploaderEmail,
      );

      const securityRole = await getSecurityRoleFromDB(this.prisma);

      if (uploaderInfo.role_id === securityRole.role_id) {
        isBanPending = true;
      }

      return await this.prisma.banDetail.create({
        data: {
          banDetail_reason: createBanDetailDto.banDetailReason
            .toLocaleLowerCase()
            .trim(),
          banDetail_startDate: createBanDetailDto.banDetailStartDate,
          banDetail_endDate: createBanDetailDto.banDetailEndDate,
          banDetail_isBanPending: isBanPending,
          bannedPerson_id: createBanDetailDto.bannedPersonId,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAll(): Promise<BanDetail[] | string> {
    try {
      return await this.prisma.banDetail.findMany();
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findOne(id: number): Promise<BanDetail | string> {
    return await this.prisma.banDetail.findFirstOrThrow({
      where: {
        banDetail_id: id,
      },
    });
  }

  async update(id: number, updateBanDetailDto: UpdateBanDetailDto): Promise<BanDetail | string> {
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

  async updateIsBanPending(id: number, banDecisionDto: { banDecision: boolean; uploaderEmail: string }): Promise<BanDetail | string> {
    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(
        this.prisma,
        banDecisionDto.uploaderEmail,
      );

      const securityRole = await getSecurityRoleFromDB(this.prisma);

      if (uploaderInfo.role_id === securityRole.role_id) {
        return String('you do not have permission to edit this');
      }

      if (banDecisionDto.banDecision === true) {
        return await this.prisma.banDetail.update({
          where: {
            banDetail_id: id,
          },
          data: {
            banDetail_isBanPending: banDecisionDto.banDecision,
          },
        });
      } else {
        return await this.prisma.banDetail.delete({
          where: {
            banDetail_id: id,
          },
        });
      }
    } catch (error: unknown) {
      return String(error);
    }
  }

  async remove(id: number): Promise<BanDetail | string> {
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
