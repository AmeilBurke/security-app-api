import { IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  business_name: string;

  @IsOptional()
  @IsString()
  business_logo?: string;
}
