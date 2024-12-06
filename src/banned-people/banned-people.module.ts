import { Module } from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { BannedPeopleController } from './banned-people.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BannedPeopleGateway } from './banned-people.gateway';

@Module({
  controllers: [BannedPeopleController],
  providers: [BannedPeopleGateway, BannedPeopleService, PrismaService, JwtService],
})
export class BannedPeopleModule {}
