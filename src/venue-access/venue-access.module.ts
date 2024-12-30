import { Module } from '@nestjs/common';
import { VenueAccessService } from './venue-access.service';
import { VenueAccessController } from './venue-access.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VenueAccessController],
  providers: [VenueAccessService, PrismaService],
})
export class VenueAccessModule {}
