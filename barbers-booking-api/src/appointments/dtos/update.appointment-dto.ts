import { IsIn } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class UpdateStatusDto {
  @IsIn(['accepted', 'rejected', 'canceled', 'completed'])
  status: AppointmentStatus;
}

export class UpdateAppointmentDto {
  dateTime?: Date;
  barberId?: number;
  serviceId?: number;
}
