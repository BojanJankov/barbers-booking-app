import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @IsEmail()
  clientEmail: string;

  @IsNotEmpty()
  day: string; // e.g. "2025-05-01"

  @IsNotEmpty()
  term: string; // e.g. "13:00"

  @IsNumber()
  barberId: number;

  @IsNumber()
  serviceId: number;
}
