import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Barber } from './entities/barber.entity';
import { UpdateBarberDto } from './dtos/update.barber-dto';
import { User } from 'src/users/entities/user.entity';
import { CreateBarberDto } from './dtos/create.barber-dto';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { UpdateAvailableTermsDto } from './dtos/update-available-terms.dto';

@Injectable()
export class BarbersService {
  constructor(
    @InjectRepository(Barber)
    private barbersRepository: Repository<Barber>,
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async findAll() {
    return this.barbersRepository.find({
      relations: {
        schedules: true,
        services: true,
        appointments: true,
        ratings: true,
      },
    });
  }

  async createBarberProfile(data: CreateBarberDto) {
    const { userId, ...barberData } = data;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role !== 'barber') {
      throw new ForbiddenException('Only barbers can create a profile');
    }

    if (user.barber) {
      throw new ForbiddenException('You already have a barber profile');
    }

    const newBarber = this.barbersRepository.create({
      ...barberData,
      user,
    });

    console.log(newBarber);

    return await this.barbersRepository.save(newBarber);
  }

  async updateBarberProfile(
    userId: string,
    data: UpdateBarberDto,
  ): Promise<Barber> {
    const barber = await this.barbersRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!barber) {
      throw new ForbiddenException(
        'You do not have permission to update this profile',
      );
    }

    console.log('Data od berber sto se editira:', data);

    Object.assign(barber, data);
    return await this.barbersRepository.save(barber);
  }

  async findOne(id: number) {
    return await this.barbersRepository.findOne({
      where: {
        id,
      },
      relations: {
        services: true,
        appointments: true,
        ratings: true,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.barbersRepository.delete(id);
  }

  async addSchedule(
    barberId: number,
    day: string,
    startTime: string,
    endTime: string,
  ): Promise<Schedule> {
    const barber = await this.barbersRepository.findOneBy({ id: barberId });
    if (!barber) {
      throw new Error('Barber not found');
    }

    const schedule = new Schedule();
    schedule.barber = barber;
    schedule.day = day;
    schedule.startTime = startTime;
    schedule.endTime = endTime;

    return this.schedulesRepository.save(schedule);
  }

  async getAvailableTerms(barberId: number) {
    const schedules = await this.schedulesRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.appointment', 'appointment')
      .leftJoinAndSelect('schedule.barber', 'barber')
      .where('barber.id = :barberId', { barberId })
      .andWhere('appointment.id IS NULL')
      .getMany();

    const groupedByDay: Record<string, { time: string; scheduleId: number }[]> =
      {};

    for (const schedule of schedules) {
      const day = schedule.day.toString().split('T')[0];

      if (!groupedByDay[day]) {
        groupedByDay[day] = [];
      }

      groupedByDay[day].push({
        time: schedule.time,
        scheduleId: schedule.id,
      });
    }

    return Object.entries(groupedByDay).map(([day, terms]) => ({
      day,
      terms,
    }));
  }

  async updateAvailableTerms(
    barberId: number,
    updateAvailableTermsDto: UpdateAvailableTermsDto,
  ) {
    const { availableTerms } = updateAvailableTermsDto;

    await this.schedulesRepository.delete({ barber: { id: barberId } });

    const newSchedules = availableTerms.flatMap(({ day, terms }) =>
      terms.map((term) => ({
        day,
        time: term,
        startTime: '00:00',
        endTime: '23:59',
        barber: { id: barberId },
      })),
    );

    const createdSchedules = this.schedulesRepository.create(newSchedules);
    await this.schedulesRepository.save(createdSchedules);

    return { message: 'Available terms updated successfully.' };
  }
  async getServicesByBarber(barberId: number) {
    const barber = await this.barbersRepository.findOne({
      where: {
        id: barberId,
      },
      relations: {
        services: true,
      },
    });

    return barber.services;
  }

  async getAppointmentsByBarber(barberId: number) {
    const barber = await this.barbersRepository.findOne({
      where: {
        id: barberId,
      },
      relations: {
        appointments: {
          schedule: true,
        },
      },
    });

    return barber.appointments;
  }
}
