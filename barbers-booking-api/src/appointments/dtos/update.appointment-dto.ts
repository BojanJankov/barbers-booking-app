import { IsIn } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class UpdateAppointmentDto {
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  day?: string;
  term?: string; // e.g. "13:00"
  barberId?: number;
  serviceId?: number;
}
