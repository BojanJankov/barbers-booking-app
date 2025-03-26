import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Barber } from './entities/barber.entity';
import { UpdateBarberDto } from './dtos/update.barber-dto';
import { CreateBarberDto } from './dtos/create.barber-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/roles.model';

@UseGuards(AuthGuard, RolesGuard)
@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Roles(RoleType.BARBER)
  @Post('create')
  async createBarber(@Request() req, @Body() data: CreateBarberDto) {
    return this.barbersService.createBarberProfile(req.user.id, data);
  }

  @Roles(RoleType.BARBER)
  @Put('update')
  async updateBarber(@Request() req, @Body() data: UpdateBarberDto) {
    return this.barbersService.updateBarberProfile(req.user.id, data);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Barber> {
    return this.barbersService.findOne(id);
  }

  @Roles(RoleType.BARBER)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.barbersService.remove(id);
  }

  @Roles(RoleType.BARBER)
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
