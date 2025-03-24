import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Barber } from './entities/barber.entity';
import { UpdateBarberDto } from './dtos/update.barber-dto';

@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Post('create')
  async createBarber(
    @Body() barberData: { name: string; email: string; phoneNumber: string },
  ): Promise<Barber> {
    return this.barbersService.createBarber(
      barberData.name,
      barberData.email,
      barberData.phoneNumber,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Barber> {
    return this.barbersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBarberDto: UpdateBarberDto,
  ): Promise<Barber> {
    return this.barbersService.update(id, updateBarberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.barbersService.remove(id);
  }

  @Post(':barberId/schedule')
  async addSchedule(
    @Param('barberId') barberId: number,
    @Body() scheduleData: { day: string; startTime: string; endTime: string },
  ): Promise<Schedule> {
    return this.barbersService.addSchedule(
      barberId,
      scheduleData.day,
      scheduleData.startTime,
      scheduleData.endTime,
    );
  }
}
