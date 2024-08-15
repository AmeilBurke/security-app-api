import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAlertDetailDto {
  @IsNumber()
  @IsOptional()
  alertDetailsBannedPersonId: Number;
  
  @IsNumber()
  @IsOptional()
  alertDetailsBusinessId: Number;
}
