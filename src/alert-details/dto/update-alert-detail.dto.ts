import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateAlertDetailDto {
  @IsNumber()
  alertDetail_id: number;

  @IsOptional()
  @IsNumber()
  alertDetail_bannedPersonId?: number;

  @IsOptional()
  @IsString()
  alertDetail_name?: string;

  @IsOptional()
  @IsString()
  alertDetail_alertReason?: string;

  @IsOptional()
  @IsString()
  alertDetail_imageName?: string;
}
