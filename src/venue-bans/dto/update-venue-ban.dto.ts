import { IsOptional, IsNumber } from "class-validator";

export class UpdateVenueBanDto {
  @IsOptional()
  @IsNumber()
  venueBan_bannedPersonId: number;

  @IsOptional()
  @IsNumber()
  venueBan_venueId: number;
}
