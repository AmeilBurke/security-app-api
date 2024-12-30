import { IsOptional, IsNumber } from 'class-validator';

export class UpdateVenueManagerDto {
  @IsOptional()
  @IsNumber()
  venueManager_venueId: number;

  @IsOptional()
  @IsNumber()
  venueManager_accountId: number;
}
