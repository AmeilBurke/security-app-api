import { IsOptional, IsString } from "class-validator";

export class UpdateBusinessDto {
  @IsOptional()
  @IsString()
  business_name: string;

  @IsOptional()
  @IsString()
  business_logo?: string;
}
