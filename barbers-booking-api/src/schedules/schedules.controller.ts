import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { UpdateScheduleDto } from './dtos/update.schedule-dto';
import { CreateScheduleDto } from './dtos/create.schedule-dto';
import { Schedule } from './entities/schedule.entity';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Schedule> {
    return this.schedulesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.schedulesService.remove(id);
  }
}
