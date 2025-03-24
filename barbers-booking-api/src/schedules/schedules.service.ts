import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dtos/create.schedule-dto';
import { UpdateScheduleDto } from './dtos/update.schedule-dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create({
      ...createScheduleDto,
      barber: { id: createScheduleDto.barberId },
    });
    // const schedule = new Schedule();
    // schedule.barber = { id: createScheduleDto.barberId } as Barber;
    // schedule.day = createScheduleDto.day;
    // schedule.startTime = createScheduleDto.startTime;
    // schedule.endTime = createScheduleDto.endTime;

    return this.scheduleRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findOne(id: number): Promise<Schedule> {
    return this.scheduleRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOneBy({ id });
    if (!schedule) throw new Error('Schedule not found');
    Object.assign(schedule, updateScheduleDto);
    return this.scheduleRepository.save(schedule);
  }

  async remove(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}
