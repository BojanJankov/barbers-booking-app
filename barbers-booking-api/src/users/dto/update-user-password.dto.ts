import { IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  newPassword: string;
}
