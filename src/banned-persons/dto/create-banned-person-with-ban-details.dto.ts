import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBannedPersonWithBanDetailsDto {
  @IsString()
  @IsOptional()
  bannedPersonImage?: string;

  @IsString()
  @IsNotEmpty()
  bannedPersonName: string;

  @IsString()
  @IsNotEmpty()
  banDetailReason: string;

  @IsString()
  @IsNotEmpty()
  banDetailStartDate: string;

  @IsString()
  @IsNotEmpty()
  banDetailEndDate: string;

  @IsString()
  @IsNotEmpty()
  uploaderEmail: string
}
