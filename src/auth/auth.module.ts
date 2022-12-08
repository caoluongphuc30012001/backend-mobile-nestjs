import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import 'dotenv/config';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
