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
    return this.barbersRepository.find();
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

    return this.barbersRepository.save(newBarber);
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

    Object.assign(barber, data);
    return this.barbersRepository.save(barber);
  }

  async findOne(id: number): Promise<Barber> {
    return this.barbersRepository.findOne({
      where: {
        id,
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
    const schedules = await this.schedulesRepository.find({
      where: {
        barber: {
          id: barberId,
        },
      },
    });

    const appointments = await this.appointmentRepo.find(
      {
        where: {
          barber: {
            id: barberId,
          },
        },
      },
      // Only for future appointments
    );

    const bookedMap = new Map<string, Set<string>>();
    for (const app of appointments) {
      const date = new Date(app.date).toISOString().split('T')[0];
      if (!bookedMap.has(date)) bookedMap.set(date, new Set());
      bookedMap.get(date).add(app.time);
    }

    const availableDays = [];

    // Generate available slots for next 30 days
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      const dayOfWeek = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      const schedule = schedules.find((s) => s.day === dayOfWeek);
      if (!schedule) continue; // Barber doesn't work this day

      const start = parseInt(schedule.startTime.split(':')[0]);
      const end = parseInt(schedule.endTime.split(':')[0]);

      const times = [];
      for (let hour = start; hour < end; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        const dateString = currentDate.toISOString().split('T')[0];

        if (!bookedMap.get(dateString)?.has(timeString)) {
          times.push(timeString);
        }
      }

      availableDays.push({
        date: currentDate.toISOString().split('T')[0],
        times,
      });
    }

    return availableDays;
  }
}
