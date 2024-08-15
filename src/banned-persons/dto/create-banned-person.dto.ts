import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannedPersonDto {
  @IsString()
  @IsOptional()
  bannedPersonImage?: string;

  @IsString()
  @IsNotEmpty()
  bannedPersonName: string;

  @IsString()
  @IsNotEmpty()
  uploaderEmail: string;
}
