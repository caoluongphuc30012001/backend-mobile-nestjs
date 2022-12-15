import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { NoticeService } from './notice.service';
import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';

@Controller('notifications')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/')
  async getListNotice(@Query('userId') userId: string, @Res() res: Response) {
    const data = await this.noticeService.getListNotice(userId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @Get('/test-socket')
  async testSocket() {
    await this.noticeService.testSocket();
  }
}
