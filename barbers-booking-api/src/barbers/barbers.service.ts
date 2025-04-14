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
  constructor(
    @InjectRepository(Barber)
    private barbersRepository: Repository<Barber>,
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
