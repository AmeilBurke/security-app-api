import { Module } from '@nestjs/common';
import { BannedPersonsService } from './banned-persons.service';
import { BannedPersonsController } from './banned-persons.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BannedPersonsController],
  providers: [BannedPersonsService, PrismaService],
})
export class BannedPersonsModule {}
