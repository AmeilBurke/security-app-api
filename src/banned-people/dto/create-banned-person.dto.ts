import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannedPersonDto {
  @IsString()
  @IsOptional()
  bannedPerson_image?: string;

  @IsString()
  @IsNotEmpty()
  bannedPerson_name: string;
}
