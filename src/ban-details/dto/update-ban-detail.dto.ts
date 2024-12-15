import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBanDetailDto {
  @IsOptional()
  @IsNumber()
  banDetails_bannedPersonId: number;

  @IsOptional()
  @IsString()
  banDetails_reason: string;

  @IsOptional()
  @IsString()
  banDetails_banStartDate: string;

  @IsOptional()
  @IsString()
  banDetails_banEndDate: string;

  @IsOptional()
  @IsNumber()
  banDetails_venueBanId: number;

  @IsOptional()
  @IsBoolean()
  banDetails_isBanPending: boolean;
}
