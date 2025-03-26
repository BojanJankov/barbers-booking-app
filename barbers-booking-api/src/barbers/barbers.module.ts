import { Module } from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { BarbersController } from './barbers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Barber]),
    SchedulesModule,
    AppointmentsModule,
    UsersModule,
  ],
  controllers: [BarbersController],
  providers: [BarbersService],
  exports: [TypeOrmModule, BarbersService],
})
export class BarbersModule {}
