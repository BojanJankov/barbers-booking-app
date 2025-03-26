import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  userId: string;

  @IsNumber()
  barberId: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
