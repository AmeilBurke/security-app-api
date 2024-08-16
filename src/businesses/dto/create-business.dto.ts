import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsOptional()
  businessLogo?: string;

  @IsString()
  @IsEmail()
  uploaderEmail: string;
}
