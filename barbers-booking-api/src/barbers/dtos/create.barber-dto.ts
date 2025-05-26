import { IsString, IsEmail, IsNumber } from 'class-validator';

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

  @IsString()
  bussinesName: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  description: string;
}
