import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import AppConfigService from 'src/config/appConfig/app-config.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly appConfig: AppConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const users = await this.userService.findAll();
    const user = users.filter((user) => user.email == email.toLowerCase())[0];
    if (user.password == pass) {
      return {
        access_token: this.jwtService.sign(user),
        expiresIn: this.appConfig.jwt.expiresIn,
      };
    } else throw new UnauthorizedException('Invalid username or password');
  }
}
