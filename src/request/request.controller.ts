import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { DeleteRequest } from './dtos/delete-request.dto';
import { UpdateRequest } from './dtos/update-request.dto';
import { RequestService } from './request.service';
import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Res,
  Param,
  HttpStatus,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from './schemas/request.schema';

@Controller('requests')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getListRequest(@Res() res: Response) {
    const data = await this.requestService.getListRequest();
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:requestId')
  async getRequestInformation(
    @Param('requestId') requestId: string,
    @Res() res: Response,
  ) {
    const data = await this.requestService.getRequestInformation(requestId);
    res.status(HttpStatus.OK).send(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createRequest(@Body() requestPayload: Request, @Res() res: Response) {
    const data = await this.requestService.createRequest(requestPayload);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateRequest(
    @Body() requestPayload: UpdateRequest,
    @Res() res: Response,
  ) {
    const data = await this.requestService.updateRequest(requestPayload);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteRequest(
    @Body() { requestId }: DeleteRequest,
    @Res() res: Response,
  ) {
    const data = await this.requestService.deleteRequest(requestId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
}
