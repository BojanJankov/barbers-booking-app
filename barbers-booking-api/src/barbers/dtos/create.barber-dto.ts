import { IsString, IsEmail, IsNumber, IsUrl } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  experience: number;

  @IsString()
  image: string;

  @IsString()
  userId: string;
}
