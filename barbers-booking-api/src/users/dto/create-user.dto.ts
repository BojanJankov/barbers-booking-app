import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { RoleType } from 'src/roles/roles.model';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @Length(3, 20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Length(6, 20)
  username: string;

  @IsString()
  role?: RoleType;
}
