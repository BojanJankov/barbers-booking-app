import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { BarbersModule } from 'src/barbers/barbers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), BarbersModule],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
