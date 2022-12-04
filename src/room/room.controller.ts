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
} from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { Response } from 'express';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('/')
  async getListRoom(@Query('status') status: string, @Res() res: Response) {
    const data = await this.roomService.getListRoom(status);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

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

  @Post('/')
  async createRoom(@Body() roomPayload: CreateRoom, @Res() res: Response) {
    const data = await this.roomService.createRoom(roomPayload);
    res.status(HttpStatus.OK).send({ code: 0, data });
  }

  @Put('/')
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

  @Delete('/')
  async deleteRoom(@Body() body: DeleteRoom, @Res() res: Response) {
    const data = await this.roomService.deleteRoom(body.roomId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data: data,
    });
  }
}
