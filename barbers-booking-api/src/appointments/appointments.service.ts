import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import {
  UpdateAppointmentDto,
  UpdateStatusDto,
} from './dtos/update.appointment-dto';
import { CreateAppointmentDto } from './dtos/create.appointment-dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AppointmentsService {
  appointmentRepository: any;
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly mailerService: MailerService,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment: Appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      status: 'pending',
    });

    await this.mailerService.sendEmail(
      appointment.barber.email,
      'New Appointment Request',
      `You have a new appointment request from ${appointment.user.username} on ${appointment.dateTime}.`,
    );

    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne(id);
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    const appointment: Appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');

    appointment.status = updateStatusDto.status;

    await this.mailerService.sendEmail(
      appointment.user.email,
      `Your Appointment has been ${appointment.status}`,
      `Your appointment on ${appointment.dateTime} has been ${appointment.status} by ${appointment.barber.name}.`,
    );

    return await this.appointmentRepository.save(appointment);
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
