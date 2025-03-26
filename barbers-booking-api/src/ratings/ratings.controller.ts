import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dtos/create.rating-dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('add-rating')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Get('/user/:id/barber/:barberId')
  findRatingByUserAndPost(
    @Param('id') userId: string,
    @Param('barberId') barberId: number,
  ) {
    return this.ratingsService.findRatingByUserAndBarber(userId, barberId);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
  //     return this.ratingsService.update(+id, updateRatingDto);
  //   }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ratingsService.remove(+id);
  // }
}
