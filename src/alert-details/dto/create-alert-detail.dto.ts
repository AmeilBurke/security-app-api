import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlertDetailDto {
  @IsOptional()
  @IsNumber()
  alertDetail_bannedPersonId?: number;
  
  @IsString()
  alertDetail_name: string;

  @IsString()
  alertDetails_alertReason: string;
}
