import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AppConfigModule from 'src/config/appConfig/app-config.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export default class AuthModule {}
