import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dtos/create.appointment-dto';
import {
  UpdateAppointmentDto,
  UpdateStatusDto,
} from './dtos/update.appointment-dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, updateStatusDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.appointmentsService.remove(id);
  }

  // @Get(':userId')
  // async getAppointmentsForUser(
  //   @Param('userId') userId: string,
  // ): Promise<Appointment[]> {
  //   return this.appointmentsService.getAppointmentsForUser(userId);
  // }
}
