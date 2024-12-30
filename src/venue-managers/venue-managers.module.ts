import { Module } from '@nestjs/common';
import { VenueManagersService } from './venue-managers.service';
import { VenueManagersController } from './venue-managers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VenueManagersController],
  providers: [VenueManagersService, PrismaService],
})
export class VenueManagersModule {}
