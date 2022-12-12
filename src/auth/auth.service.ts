import { UserService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(phoneNumber: string, password: string) {
    const data = await this.userService.validate(phoneNumber, password);
    if (data) {
      const accessToken = this.jwtService.sign(
        {
          _id: data._id,
          phoneNumber: data.phoneNumber,
          role: data.role,
        },
        { expiresIn: '1200s' },
      );
      const refreshToken = this.jwtService.sign(
        {
          _id: data._id,
          phoneNumber: data.phoneNumber,
          role: data.role,
        },
        { expiresIn: '300s' },
      );
      return { accessToken, refreshToken };
    } else {
      return null;
    }
  }

  async refreshToken(oldedToken: any) {
    try {
      const data = this.jwtService.verify(oldedToken);
      if (data) {
        const accessToken = this.jwtService.sign(
          {
            _id: data._id,
            phoneNumber: data.phoneNumber,
            role: data.role,
          },
          { expiresIn: '1200s' },
        );
        const refreshToken = this.jwtService.sign(
          {
            _id: data._id,
            phoneNumber: data.phoneNumber,
            role: data.role,
          },
          { expiresIn: '300s' },
        );
        return { accessToken, refreshToken };
      }
      return 'Your refresh token was expired';
    } catch (error) {
      return 'Your refresh token was expired';
    }
  }
}
