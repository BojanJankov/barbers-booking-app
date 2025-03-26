import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Repository } from 'typeorm';
import { Barber } from './entities/barber.entity';
import { UpdateBarberDto } from './dtos/update.barber-dto';
import { User } from 'src/users/entities/user.entity';
import { CreateBarberDto } from './dtos/create.barber-dto';

@Injectable()
export class BarbersService {
  barberRepository: any;
  constructor(
    @InjectRepository(Barber)
    private readonly barbersRepository: Repository<Barber>,
    @InjectRepository(Schedule)
    private readonly schedulesRepository: Repository<Schedule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBarberProfile(
    userId: string,
    data: CreateBarberDto,
  ): Promise<Barber> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'barber') {
      throw new ForbiddenException('Only barbers can create a profile');
    }

    if (user.barber) {
      throw new ForbiddenException('You already have a barber profile');
    }

    const barber = this.barberRepository.create({ ...data, user });
    return this.barberRepository.save(barber);
  }

  async updateBarberProfile(
    userId: string,
    data: UpdateBarberDto,
  ): Promise<Barber> {
    const barber = await this.barberRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!barber) {
      throw new ForbiddenException(
        'You do not have permission to update this profile',
      );
    }

    Object.assign(barber, data);
    return this.barberRepository.save(barber);
  }

  async findAll(): Promise<Barber[]> {
    return this.barberRepository.find();
  }

  async findOne(id: number): Promise<Barber> {
    return this.barberRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.barberRepository.delete(id);
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
}
