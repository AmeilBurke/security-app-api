import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlertDetailDto {
  // need to convert to string
  @IsOptional()
  @IsString()
  alertDetail_bannedPersonId?: string;
  
  @IsString()
  alertDetail_name: string;

  @IsString()
  alertDetails_alertReason: string;
}