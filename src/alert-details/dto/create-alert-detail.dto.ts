import { IsNumber, IsPositive } from 'class-validator';

export class CreateAlertDetailDto {
  @IsNumber()
  @IsPositive()
  alertDetails_bannedPersonId: number;

  @IsNumber()
  @IsPositive()
  alertDetails_businessId: number;
}
