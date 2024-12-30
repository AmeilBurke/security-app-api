import { IsNumber } from "class-validator";

export class CreateVenueAccessDto {
  @IsNumber()
  venueAccess_accountId: number;
  @IsNumber()
  venueAccess_venueId: number;
}
