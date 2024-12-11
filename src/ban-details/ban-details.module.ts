import { Module } from '@nestjs/common';
import { BanDetailsService } from './ban-details.service';
import { BanDetailsController } from './ban-details.controller';

@Module({
  controllers: [BanDetailsController],
  providers: [BanDetailsService],
})
export class BanDetailsModule {}
