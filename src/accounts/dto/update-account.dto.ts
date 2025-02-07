import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  account_email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  account_password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  account_name: string;

  @IsOptional()
  @IsNumber()
  account_roleId: number;
  
  @IsOptional()
  @IsNumber({}, { each: true })
  account_venueAccessIds?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  account_venueManagerIds?: number[];
}
