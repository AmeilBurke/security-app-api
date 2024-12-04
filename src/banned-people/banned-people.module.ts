import { Module } from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { BannedPeopleController } from './banned-people.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [BannedPeopleController],
  providers: [BannedPeopleService, PrismaService],
})
export class BannedPeopleModule {}
