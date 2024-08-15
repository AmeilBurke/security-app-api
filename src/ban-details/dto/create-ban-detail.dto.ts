import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBanDetailDto {
  @IsString()
  @IsNotEmpty()
  banDetailReason: string;

  @IsString()
  @IsNotEmpty()
  banDetailStartDate: string;

  @IsString()
  @IsNotEmpty()
  banDetailEndDate: string;
  
  @IsNumber()
  bannedPersonId: number;

  @IsString()
  @IsNotEmpty()
  uploaderEmail: string
}
