import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.role.findMany();
    } catch (error: unknown) {
      return String(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.role.findUniqueOrThrow({
        where: {
          role_id: id,
        },
      });
    } catch (error: unknown) {
      return String(error);
    }
  }
}
