import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBanDetailDto {
  @IsString()
  @IsOptional()
  banDetailReason: string;

  @IsString()
  @IsOptional()
  banDetailStartDate: string;

  @IsString()
  @IsOptional()
  banDetailEndDate: string;

  @IsNumber()
  @IsOptional()
  bannedPersonId?: number;
}
