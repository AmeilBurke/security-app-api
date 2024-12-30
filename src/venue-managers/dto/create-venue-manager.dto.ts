import { IsNumber } from "class-validator";

export class CreateVenueManagerDto {
  @IsNumber()
  venueManager_venueId: number;
  
  @IsNumber()
  venueManager_accountId: number;
}
