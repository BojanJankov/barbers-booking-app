import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateBarberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
