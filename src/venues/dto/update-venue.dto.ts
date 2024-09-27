import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVenueDto {
  @IsOptional()
  @IsString()
  venue_name: string;

  @IsOptional()
  @IsString()
  venue_logo?: string;

  @IsOptional()
  @IsNumber()
  business_id: number;
}
