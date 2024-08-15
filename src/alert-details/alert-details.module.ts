import { Module } from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { AlertDetailsController } from './alert-details.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlertDetailsController],
  providers: [AlertDetailsService, PrismaService],
})
export class AlertDetailsModule {}
