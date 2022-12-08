import { RefreshToken } from './dtos/refresh-token.dto';
import { AuthService } from './auth.service';
import { AuthLogin } from './dtos/auth-login.dto';
import { Controller, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async validate(@Body() authPayload: AuthLogin, @Res() res: Response) {
    const data = await this.authService.validate(
      authPayload.phoneNumber,
      authPayload.password,
    );
    if (data) {
      res.status(HttpStatus.OK).send({ code: 0, data });
    } else {
      res.status(HttpStatus.OK).send({
        code: 0,
        data: 'Your phonenumber or password is incorrect',
      });
    }
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() { refreshToken }: RefreshToken,
    @Res() res: Response,
  ) {
    const data = await this.authService.refreshToken(refreshToken);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
}
