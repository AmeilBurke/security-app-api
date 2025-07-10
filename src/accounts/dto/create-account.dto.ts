import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsInt()
  roleId: number;

  @IsOptional()
  @IsInt({ each: true })
  managesVenueIds: number[];
}
