import { Module } from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { AlertDetailsGateway } from './alert-details.gateway';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AlertDetailsController } from './alert-details.controller';

@Module({
  controllers: [AlertDetailsController],
  providers: [
    AlertDetailsGateway,
    AlertDetailsService,
    PrismaService,
    JwtService,
  ],
})
export class AlertDetailsModule {}
