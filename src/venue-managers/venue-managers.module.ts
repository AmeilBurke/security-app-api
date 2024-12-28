import { Module } from '@nestjs/common';
import { VenueManagersService } from './venue-managers.service';
import { VenueManagersController } from './venue-managers.controller';

@Module({
  controllers: [VenueManagersController],
  providers: [VenueManagersService],
})
export class VenueManagersModule {}
