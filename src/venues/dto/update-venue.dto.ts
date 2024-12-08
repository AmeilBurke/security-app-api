import { IsOptional, IsString } from "class-validator";

export class UpdateVenueDto {
    @IsOptional()
    @IsString()
    venue_name!: string;
}
