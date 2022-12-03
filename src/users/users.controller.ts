import { User } from './schemas/users.schema';
import { UserService } from './users.service';
import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userId')
  async getUserInformation(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const data = await this.userService.getUserInformation(userId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data: data,
    });
  }

  @Get('/')
  async findUser(
    @Query('phoneNumber') phoneNumber: string,
    @Res() res: Response,
  ) {
    const data = await this.userService.findUser(phoneNumber);
    res.status(HttpStatus.OK).send({
      code: 0,
      data: data,
    });
  }

  @Get('/')
  async getAllUsers(@Res() res: Response) {
    const data = await this.userService.getAllUsers();
    res.status(HttpStatus.OK).send({
      code: 0,
      data: data,
    });
  }

  @Post('/')
  async createUser(@Body() userPayload: User, @Res() res: Response) {
    const data = await this.userService.createUser(userPayload);
    return res.status(HttpStatus.CREATED).send({
      code: 0,
      data: data,
    });
  }
}
