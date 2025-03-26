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
    private barbersService: BarbersService,
  ) {}

  async findAll() {
    return this.ratingRepo.find({
      relations: {
        user: true,
        barber: true,
      },
    });
  }

  async create(createRatingDto: CreateRatingDto) {
    const foundPost = await this.barbersService.findOne(
      createRatingDto.barberId,
    );

    if (foundPost.user.id === createRatingDto.userId) {
      throw new Error('Operation not permitted');
    }

    const foundRatingByUser = await this.ratingRepo.findOneBy({
      user: {
        id: createRatingDto.userId,
      },
      barber: {
        id: createRatingDto.barberId,
      },
    });

    if (foundRatingByUser) {
      this.ratingRepo.remove(foundRatingByUser);
    }

    return this.ratingRepo.save({
      rating: createRatingDto.rating,
      barber: {
        id: createRatingDto.barberId,
      },
      user: {
        id: createRatingDto.userId,
      },
    });
  }

  async findRatingByUserAndBarber(userId: string, barberId: number) {
    const foundRating = await this.ratingRepo.findOneBy({
      user: {
        id: userId,
      },
      barber: {
        id: barberId,
      },
    });

    console.log(foundRating);

    return foundRating;
  }

  findOne(id: number) {
    return this.ratingRepo.findOneBy({ id });
  }
}
