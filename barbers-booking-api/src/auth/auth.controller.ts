import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() credentials: CredentialsDto,
    @Res() response: Response,
  ) {
    const { token, refreshToken, user } =
      await this.authService.loginUser(credentials);

    response.set('access-control-expose-headers', '*');
    response.set('access-token', token);
    response.set('refresh-token', refreshToken);

    return response.json(user);
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logoutUser(@Headers('refresh-token') refreshToken: string) {
    console.log(refreshToken);
    return this.authService.logoutUser(refreshToken);
  }

  @Get('refresh-token')
  async refreshAccessToken(
    @Res() response: Response,
    @Headers('refresh-token') refreshToken: string,
  ) {
    const { token, refreshToken: newRefreshToken } =
      await this.authService.refreshAccessToken(refreshToken);

    response.set('access-control-expose-headers', '*');
    response.set('access-token', token);
    response.set('refresh-token', newRefreshToken);

    response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
