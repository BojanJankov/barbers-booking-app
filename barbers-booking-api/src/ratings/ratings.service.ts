import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarbersService } from 'src/barbers/barbers.service';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dtos/create.rating-dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  async findAll() {
    return this.ratingRepo.find({
      relations: {
        barber: true,
      },
    });
  }

  async create(createRatingDto: CreateRatingDto) {
    return this.ratingRepo.save({
      rating: createRatingDto.rating,
      barber: {
        id: createRatingDto.barberId,
      },
    });
  }

  async findRatingByBarber(barberId: number) {
    const foundRating = await this.ratingRepo.findOneBy({
      barber: {
        id: barberId,
      },
    });

    return foundRating;
  }

  findOne(id: number) {
    return this.ratingRepo.findOneBy({ id });
  }
}
