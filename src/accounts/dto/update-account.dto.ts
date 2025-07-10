import { IsString, IsOptional, IsEmail, IsInt } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  roleId: number;

  @IsOptional()
  @IsInt({ each: true })
  managesVenueIds: number[];
}
