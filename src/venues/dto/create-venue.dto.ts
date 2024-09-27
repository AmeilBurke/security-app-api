import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateVenueDto {
  @IsString()
  venue_name: string;

  @IsOptional()
  @IsString()
  venue_logo?: string;

  @IsNumberString()
  venue_businessId: number | string;

  @IsOptional()
  @IsString()
  venue_managerIds?: string;
}
