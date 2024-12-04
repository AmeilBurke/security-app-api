import { IsOptional, IsString } from 'class-validator';

export class UpdateBannedPersonDto {
  @IsOptional()
  @IsString()
  bannedPerson_name?: string;
  
  @IsOptional()
  @IsString()
  bannedPerson_imagePath?: string;
}
