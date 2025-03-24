import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = this.extractToken(request);

      console.log(token);

      const { id } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      const foundUser = await this.usersService.findUserById(id);

      delete foundUser.password;

      request.user = foundUser;

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  private extractToken(request: Request) {
    const token = request.headers['authorization']?.split(' ')[1];

    return token;
  }
}
