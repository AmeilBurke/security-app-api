import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  account_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  account_email: string;

  @IsString()
  @IsNotEmpty()
  account_password: string;

  @IsNumber()
  account_roleId: number;

  @IsNumber({}, { each: true })
  account_allowedVenues: number[];

  // need to see if this validates
  @IsNumber({}, { each: true })
  account_allowedBusinesses: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  account_venueManager?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  account_businessManager?: number[];
}
