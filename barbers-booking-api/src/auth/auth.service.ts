import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare, hash } from 'bcryptjs';
import { CredentialsDto } from './dtos/credentials.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userData: CreateUserDto) {
    const foundUser = await this.usersService.findUserByEmail(userData.email);

    if (foundUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await hash(userData.password, 8);

    userData.password = hashedPassword;

    await this.usersService.create(userData);
  }

  async loginUser(credentials: CredentialsDto) {
    const foundUser = await this.usersService.findUserByEmail(
      credentials.email,
    );

    if (!foundUser) throw new UnauthorizedException('Invalid Credentials');

    const isPasswordValid = await compare(
      credentials.password,
      foundUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Credentials');

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    console.log('access-token', token);

    const refreshToken = await this.jwtService.signAsync(
      { id: foundUser.id },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    await this.usersService.saveRefreshToken(foundUser.id, refreshToken);

    delete foundUser.refreshTokens;
    delete foundUser.password;

    return {
      user: foundUser,
      token,
      refreshToken,
    };
  }

  async logoutUser(refreshToken: string) {
    try {
      const { id } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      await this.usersService.deleteRefreshToken(id, refreshToken);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Can't logout user");
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const { id } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
      const foundUser = await this.usersService.findUserById(id);

      const tokenExists = foundUser.refreshTokens.some(
        (token) => token === refreshToken,
      );

      if (!tokenExists) throw new Error();

      const newAccessToken = await this.jwtService.signAsync({
        id: foundUser.id,
      });

      const newRefreshToken = await this.jwtService.signAsync(
        { id: foundUser.id },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      );

      await this.usersService.deleteRefreshToken(foundUser.id, refreshToken);
      await this.usersService.saveRefreshToken(foundUser.id, newRefreshToken);

      return {
        token: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
