import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBannedPersonDto {
  @IsString()
  @IsOptional()
  bannedPersonImage?: string;

  @IsString()
  @IsOptional()
  bannedPersonName?: string;

  @IsString()
  @IsNotEmpty()
  uploaderEmail: string;
}
