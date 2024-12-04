import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBannedPersonDto {
  @IsString()
  bannedPerson_name: string;
}
