import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateAlertDetailDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  alertDetails_bannedPersonId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  alertDetails_businessId: number;
}
