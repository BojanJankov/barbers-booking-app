import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepo.save(createUserDto);
  }

  findAll() {
    return this.usersRepo.find({});
  }

  async findUserById(id: string) {
    const foundUser = await this.usersRepo.findOne({
      where: {
        id: id,
      },
    });

    return foundUser;
  }

  async updatePasswordOnUser(
    userId: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const foundUser = await this.findUserById(userId);

    if (!foundUser) throw new BadRequestException('User not found');

    const hashedPassword = await hash(updateUserPasswordDto.newPassword, 8);

    foundUser.password = hashedPassword;

    await this.usersRepo.save(foundUser);
  }

  async findUserByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      relations: {
        barber: true,
      },
    });
  }

  // async findUserDetailsByUser(id: string) {
  //   const foundUser = await this.usersRepo.findOne({
  //     where: { id },
  //     relations: { userDetails: true },
  //   });

  //   return foundUser.userDetails;
  // }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const foundUser = await this.findUserById(userId);

    foundUser.refreshTokens.push(refreshToken);

    await this.usersRepo.save(foundUser);
  }

  async deleteRefreshToken(userId: string, refreshToken: string) {
    const foundUser = await this.findUserById(userId);

    foundUser.refreshTokens = foundUser.refreshTokens.filter(
      (token) => token !== refreshToken,
    );

    await this.usersRepo.save(foundUser);
  }

  async updateUser(userId: string, updateUserData: UpdateUserDto) {
    const foundUser = await this.findUserById(userId);

    Object.assign(foundUser, updateUserData);

    await this.usersRepo.save(foundUser);
  }

  async deleteUser(id: string) {
    const foundUser = await this.findUserById(id);

    await this.usersRepo.remove(foundUser);
  }
}
