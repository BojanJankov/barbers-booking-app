import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class AvailableTermDto {
  @IsString()
  day: string;

  @IsArray()
  @IsString({ each: true })
  terms: string[];
}

export class UpdateAvailableTermsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailableTermDto)
  availableTerms: AvailableTermDto[];
}
