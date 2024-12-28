import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateIndividualBanDetailDto {

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
  @IsBoolean()
  banDetails_isBanPending: boolean;
}
