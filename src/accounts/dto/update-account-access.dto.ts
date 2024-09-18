import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAccountAccessDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  account_allowedVenues: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  account_allowedBusinesses: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  account_venueManager?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  account_businessManager?: number[];
}
