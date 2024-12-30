import { IsOptional, IsNumber } from 'class-validator';

export class UpdateVenueAccessDto {
  @IsOptional()
  @IsNumber()
  venueAccess_accountId: number;
  @IsOptional()
  @IsNumber()
  venueAccess_venueId: number;
}
