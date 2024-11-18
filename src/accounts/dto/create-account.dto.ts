import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  account_email: string;

  @IsString()
  @IsNotEmpty()
  account_password: string;

  @IsString()
  @IsNotEmpty()
  account_name: string;

  @IsNumber()
  account_roleId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  account_venueAccessIds?: number[];
}
