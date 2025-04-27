import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { ServicesModule } from 'src/services/services.module';
import { BarbersModule } from 'src/barbers/barbers.module';
import { Barber } from 'src/barbers/entities/barber.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Barber, Service]),
    MailerModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [TypeOrmModule],
})
export class AppointmentsModule {}
