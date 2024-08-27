import {
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
}
