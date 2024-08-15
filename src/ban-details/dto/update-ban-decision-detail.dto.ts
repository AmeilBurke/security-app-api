import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BanDecisionDto {
  @IsBoolean()
  banDecision: boolean;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  uploaderEmail: string;
}
