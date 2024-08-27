import { Module } from '@nestjs/common';
import { BannedPeopleService } from './banned-people.service';
import { BannedPeopleController } from './banned-people.controller';

@Module({
  controllers: [BannedPeopleController],
  providers: [BannedPeopleService],
})
export class BannedPeopleModule {}
