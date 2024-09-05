import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBannedPersonDto {
  @IsString()
  @IsOptional()
  bannedPerson_image?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bannedPerson_name: string;
}
