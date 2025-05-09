import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { UpdateAppointmentDto } from './dtos/update.appointment-dto';
import { CreateAppointmentDto } from './dtos/create.appointment-dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AppointmentsService {
  appointmentRepository: any;
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly mailerService: MailerService,
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const barber = await this.barberRepository.findOne({
      where: { id: createAppointmentDto.barberId },
    });
    if (!barber) throw new NotFoundException('Barber not found');

    const service = await this.serviceRepository.findOne({
      where: { id: createAppointmentDto.serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    const appointment: Appointment =
      this.appointmentRepository.create(createAppointmentDto);

    const savedAppointment = this.appointmentRepository.save(appointment);

    await this.mailerService.sendEmail(
      appointment.barber.email,
      'New Appointment for you!',
      `You have a new reserved term from ${appointment.clientName} with phone number: ${appointment.clientPhone} and email: ${appointment.clientEmail} on ${appointment.day} at ${appointment.term}.`,
    );

    await this.mailerService.sentToClient(savedAppointment);

    return savedAppointment;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne(id);
  }

  // async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
  //   const appointment: Appointment = await this.appointmentRepository.findOne({
  //     where: { id },
  //   });
  //   if (!appointment) throw new NotFoundException('Appointment not found');

  //   appointment.status = updateStatusDto.status;

  //   await this.mailerService.sendEmail(
  //     appointment.clientEmail,
  //     `Your Appointment has been ${appointment.status}`,
  //     `Your appointment on ${appointment.date} has been ${appointment.status} by ${appointment.barber.name}.`,
  //   );

  //   return await this.appointmentRepository.save(appointment);
  // }

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

  // async getAppointmentsForUser(userId: string): Promise<Appointment[]> {
  //   return this.appointmentsRepository.find({
  //     where: { user: { id: userId } },
  //     relations: ['barber', 'service'],
  //   });
  // }
}
