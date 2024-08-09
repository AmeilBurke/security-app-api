import { Module } from '@nestjs/common';
import { BanDetailsService } from './ban-details.service';
import { BanDetailsController } from './ban-details.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BanDetailsController],
  providers: [BanDetailsService, PrismaService],
})
export class BanDetailsModule {}
