import { IsNumber } from 'class-validator';

export class CreateAlertDetailDto {
  @IsNumber()
  alertDetailsBannedPersonId: number;
  
  @IsNumber()
  alertDetailsBusinessId: number;
}
