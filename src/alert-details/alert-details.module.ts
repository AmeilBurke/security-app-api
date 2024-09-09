import { Module } from '@nestjs/common';
import { AlertDetailsService } from './alert-details.service';
import { AlertDetailsController } from './alert-details.controller';

@Module({
  controllers: [AlertDetailsController],
  providers: [AlertDetailsService],
})
export class AlertDetailsModule {}
