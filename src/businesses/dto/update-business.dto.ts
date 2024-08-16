import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateBusinessDto {
  @IsString()
  @IsOptional()
  businessName?: string;

  @IsString()
  @IsOptional()
  businessLogo?: string;

  @IsString()
  @IsEmail()
  uploaderEmail: string;
}
