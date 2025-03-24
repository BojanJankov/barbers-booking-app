import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { UpdateAppointmentDto } from './dtos/update.appointment-dto';
import { CreateAppointmentDto } from './dtos/create.appointment-dto';

@Injectable()
export class AppointmentsService {
  appointmentRepository: any;
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { userId, barberId, serviceId, dateTime } = createAppointmentDto;
    const appointment = new Appointment();
    appointment.user = { id: userId } as User;
    appointment.barber = { id: barberId } as Barber;
    appointment.service = { id: serviceId } as Service;
    appointment.dateTime = dateTime;

    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne(id);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne(id);
    if (!appointment) throw new Error('Appointment not found');
    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }

  async getAppointmentsForUser(userId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { user: { id: userId } },
      relations: ['barber', 'service'],
    });
  }
}
