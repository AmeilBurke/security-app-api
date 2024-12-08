import { IsString } from "class-validator";

export class CreateVenueDto {
  @IsString()
  venue_name: string;
}
