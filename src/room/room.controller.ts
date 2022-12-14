import { RentRoom } from './dtos/rent-room.dto';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Role } from './../auth/enums/role.enum';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { DeleteRoom } from './dtos/delete-room.dto';
import { ModifyRoom } from './dtos/modify-room.dto';
import { CreateRoom } from './dtos/create-room.dto';
import { RoomService } from './room.service';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Query,
  Res,
  Headers,
} from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getListRoom(
    @Query('status') status: string,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: string,
    @Query('priceFrom') priceFrom: string,
    @Query('priceTo') priceTo: string,
    @Query('service') service: string,
    @Res() res: Response,
  ) {
    const data = await this.roomService.getListRoom({
      status,
      sortBy,
      sortType,
      priceFrom,
      priceTo,
      service,
    });
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/promos')
  async getPromos(@Res() res: Response) {
    const data = await this.roomService.getPromos();
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:roomId')
  async getRoomInformation(
    @Param('roomId') roomId: string,
    @Res() res: Response,
  ) {
    const data = await this.roomService.getRoomInformation(roomId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  // @Roles(Role.Admin)
  async createRoom(@Body() roomPayload: CreateRoom, @Res() res: Response) {
    const data = await this.roomService.createRoom(roomPayload);
    res.status(HttpStatus.OK).send({ code: 0, data });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/')
  // @Roles(Role.Admin)
  async updateRoomInformation(
    @Body() roomPayload: ModifyRoom,
    @Res() res: Response,
  ) {
    const data = await this.roomService.updateRoomInformation(roomPayload);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/')
  // @Roles(Role.Admin)
  async deleteRoom(@Body() body: DeleteRoom, @Res() res: Response) {
    const data = await this.roomService.deleteRoom(body.roomId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data: data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('rent-room')
  async rentRoom(@Body() { roomId, userId }: RentRoom, @Res() res: Response) {
    const data = await this.roomService.rentRoom(roomId, userId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
}
