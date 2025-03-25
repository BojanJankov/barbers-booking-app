import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Repository } from 'typeorm';
import { Barber } from './entities/barber.entity';
import { UpdateBarberDto } from './dtos/update.barber-dto';

@Injectable()
export class BarbersService {
  barberRepository: any;
  constructor(
    @InjectRepository(Barber)
    private readonly barbersRepository: Repository<Barber>,
    @InjectRepository(Schedule)
    private readonly schedulesRepository: Repository<Schedule>,
  ) {}

  async createBarber(
    name: string,
    email: string,
    phoneNumber: string,
  ): Promise<Barber> {
    const barber = new Barber();
    barber.name = name;
    barber.email = email;
    barber.phoneNumber = phoneNumber;

    return this.barbersRepository.save(barber);
  }

  async findAll(): Promise<Barber[]> {
    return this.barberRepository.find();
  }

  async findOne(id: number): Promise<Barber> {
    return this.barberRepository.findOne(id);
  }

  async update(id: number, updateBarberDto: UpdateBarberDto): Promise<Barber> {
    const barber = await this.barberRepository.findOne(id);
    if (!barber) throw new Error('Barber not found');
    Object.assign(barber, updateBarberDto);
    return this.barberRepository.save(barber);
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
