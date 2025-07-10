import { IsNumber, IsString } from 'class-validator';

export class CreateBanDetailDto {
  @IsNumber()
  bannedPersonId: number;

  @IsString()
  banReason: string;

  @IsString()
  banEndDate: string;

  @IsNumber({}, { each: true })
  venuesToBeBannedFrom: number[];
}
