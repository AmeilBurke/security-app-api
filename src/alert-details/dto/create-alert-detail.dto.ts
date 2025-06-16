import { IsOptional, IsString } from 'class-validator';

export class CreateAlertDetailDto {
  @IsOptional()
  @IsString()
  alertDetail_bannedPersonId?: string;
  
  @IsString()
  alertDetail_name: string;

  @IsString()
  alertDetail_alertReason: string;
}