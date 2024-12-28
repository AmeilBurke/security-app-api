import { IsNumber } from 'class-validator';

export class CreateVenueBanDto {
  @IsNumber()
  venueBan_bannedPersonId: number;

  @IsNumber()
  venueBan_venueId: number;
}
