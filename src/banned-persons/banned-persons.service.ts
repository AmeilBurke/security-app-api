import { Injectable } from '@nestjs/common';
import { CreateBannedPersonDto } from './dto/create-banned-person.dto';
import { UpdateBannedPersonDto } from './dto/update-banned-person.dto';
import { PrismaService } from 'src/prisma.service';
import {
  getFullAccountInfoFromEmail,
  getSecurityRoleFromDB,
} from 'src/utils/utils';
import { CreateBannedPersonWithBanDetailsDto } from './dto/create-banned-person-with-ban-details.dto';

@Injectable()
export class BannedPersonsService {
  constructor(private prisma: PrismaService) {}

  // need to figure out how to return an image, also might have to change name of file to uuid()
  // need to create banDetail when creating a new profile or updating to add a ban

  async createBannedPersonWithBanDetails(createBannedPersonWithBanDetailsDto: CreateBannedPersonWithBanDetailsDto, file: Express.Multer.File) {
    let isBanPending = false;

    if (file === undefined) {
      createBannedPersonWithBanDetailsDto.bannedPersonImage = 'placeholder value';
    } else {
      createBannedPersonWithBanDetailsDto.bannedPersonImage = file.path;
    }

    try {
      const uploaderInfo = await getFullAccountInfoFromEmail(this.prisma, createBannedPersonWithBanDetailsDto.uploaderEmail);
      const securityRole = await getSecurityRoleFromDB(this.prisma);

      if (uploaderInfo.role_id === securityRole.role_id) {
        isBanPending = true;
      }

      const bannedPersonRecord = await this.prisma.bannedPerson.create({
        data: {
          bannedPerson_image:createBannedPersonWithBanDetailsDto.bannedPersonImage,
          bannedPerson_name:createBannedPersonWithBanDetailsDto.bannedPersonName,
        },
      });

      const bannedPersonBanDetail = await this.prisma.banDetail.create({
        data: {
          banDetail_reason: createBannedPersonWithBanDetailsDto.banDetailReason,
          banDetail_startDate:createBannedPersonWithBanDetailsDto.banDetailStartDate,
          banDetail_endDate:createBannedPersonWithBanDetailsDto.banDetailEndDate,
          banDetail_isBanPending: isBanPending,
          bannedPerson_id: bannedPersonRecord.bannedPerson_id,
        },
      });

      return [bannedPersonRecord, bannedPersonBanDetail];
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.bannedPerson.findMany();
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.bannedPerson.findUniqueOrThrow({
        where: {
          bannedPerson_id: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async update(id: number, updateBannedPersonDto: UpdateBannedPersonDto) {
    try {
      return this.prisma.bannedPerson.update({
        where: {
          bannedPerson_id: id,
        },
        data: {
          bannedPerson_image: updateBannedPersonDto.bannedPersonImage,
          bannedPerson_name: updateBannedPersonDto.bannedPersonName,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }

  async remove(id: number, uploaderEmail: string) {
    try {
      const uploaderInfo = await this.prisma.account.findFirstOrThrow({
        where: {
          account_email: uploaderEmail,
        },
      });

      const securityRole = await this.prisma.role.findFirst({
        where: {
          role_name: 'security',
        },
      });

      if (uploaderInfo.role_id === securityRole.role_id) {
        return 'you do not have persmission to remove banned people';
      } else {
        return await this.prisma.bannedPerson.delete({
          where: {
            bannedPerson_id: id,
          },
        });
      }
    } catch (error: unknown) {
      return String(error);
    }
  }
}

// try {
//   const uploaderInfo = await getFullAccountInfoFromEmail(this.prisma, createBannedPersonDto.uploaderEmail);

//     return await this.prisma.bannedPerson.create({
//       data: {
//         bannedPerson_name: createBannedPersonDto.bannedPersonName,
//         bannedPerson_image: createBannedPersonDto.bannedPersonImage,
//       },
//     });
// } catch (error: unknown) {
//   return String(error);
// }
