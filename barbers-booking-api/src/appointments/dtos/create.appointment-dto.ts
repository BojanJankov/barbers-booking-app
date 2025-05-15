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

  @IsNumber()
  barberId: number;

  @IsNumber()
  serviceId: number;

  @IsNumber()
  scheduleId: number;
}
