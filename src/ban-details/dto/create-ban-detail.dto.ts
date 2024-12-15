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

  @IsNumber()
  @IsNumber({}, { each: true })
  banDetails_venueBanIds: number[];

  @IsBoolean()
  banDetails_isBanPending: boolean;
}
