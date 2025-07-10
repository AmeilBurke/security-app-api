import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBannedPersonDto {
  @IsString()
  @IsNotEmpty()
  bannedPersonName: string;
}
