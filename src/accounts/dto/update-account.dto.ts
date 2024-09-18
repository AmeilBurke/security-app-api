import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAccountDto {
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
  account_roleId: number;}
