import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Barber } from 'src/barbers/entities/barber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Barber])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
