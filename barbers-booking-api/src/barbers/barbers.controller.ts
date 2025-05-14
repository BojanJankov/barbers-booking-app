import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Barber } from './entities/barber.entity';
import { UpdateBarberDto } from './dtos/update.barber-dto';
import { CreateBarberDto } from './dtos/create.barber-dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/roles.model';
import { UpdateAvailableTermsDto } from './dtos/update-available-terms.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Get('')
  async findAllBarbers() {
    return this.barbersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Barber> {
    return this.barbersService.findOne(id);
  }

  @Get(':barberId/available')
  async getAvailableTerms(@Param('barberId') barberId: number) {
    return this.barbersService.getAvailableTerms(barberId);
  }

  @Get(':barberId/services')
  async getServicesByBarber(@Param('barberId') barberId: number) {
    return this.barbersService.getServicesByBarber(barberId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.BARBER)
  @Post()
  async create(@Body() createBarberDto: CreateBarberDto) {
    return this.barbersService.createBarberProfile(createBarberDto);
  }

  @Roles(RoleType.BARBER)
  @Patch(':id')
  async updateBarber(@Param('id') id: string, @Body() data: UpdateBarberDto) {
    console.log('Povikana patch func od controller');
    return this.barbersService.updateBarberProfile(id, data);
  }

  @Roles(RoleType.BARBER)
  @Patch(':barberId/available')
  async updateAvailableTerms(
    @Param('barberId') barberId: number,
    @Body() updateAvailableTermsDto: UpdateAvailableTermsDto,
  ) {
    return this.barbersService.updateAvailableTerms(
      barberId,
      updateAvailableTermsDto,
    );
  }

  @Roles(RoleType.BARBER)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.barbersService.remove(id);
  }

  @Roles(RoleType.BARBER)
  @Post(':barberId/schedule')
  async addSchedule(
    @Param('barberId') barberId: string,
    @Body() scheduleData: { day: string; startTime: string; endTime: string },
  ): Promise<Schedule> {
    return this.barbersService.addSchedule(
      Number(barberId),
      scheduleData.day,
      scheduleData.startTime,
      scheduleData.endTime,
    );
  }

  @Roles(RoleType.BARBER)
  @Get(':barberId/appointments')
  async getAppointmentsByBarber(@Param('barberId') barberId: number) {
    return this.barbersService.getAppointmentsByBarber(barberId);
  }
}
