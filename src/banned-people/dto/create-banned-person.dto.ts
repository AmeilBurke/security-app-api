import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBannedPersonDto {
  @IsString()
  @IsNotEmpty()
  bannedPerson_name: string;
}
