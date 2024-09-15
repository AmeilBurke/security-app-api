import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  account_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  account_email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  account_password?: string;

  @IsOptional()
  @IsNumber()
  account_roleId?: number;

  @IsOptional()
  @IsNumber(null, { each: true })
  account_allowedVenues: number[];

  @IsOptional()
  // need to see if this validates
  @IsNumber(null, { each: true })
  account_allowedBusinesses: number[];

  @IsOptional()
  @IsNumber(null, { each: true })
  account_venueManager?: number[];

  @IsOptional()
  @IsNumber(null, { each: true })
  account_businessManager?: number[];
}
