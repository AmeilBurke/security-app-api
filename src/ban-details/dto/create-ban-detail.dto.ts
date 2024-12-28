import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBanDetailDto {
  @IsNumber()
  banDetails_bannedPersonId: number;

  @IsString()
  banDetails_reason: string;

  // @IsString()
  // banDetails_banStartDate: string;

  @IsString()
  banDetails_banEndDate: string;

  @IsNumber({}, { each: true })
  banDetails_venueBanIds: number[];
}
