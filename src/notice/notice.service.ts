import { EventsGateway } from './../events/events.gateway';
import { Notice, NoticeDocument } from './schemas/notice.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createNotice(noticePayload: Notice): Promise<string> {
    try {
      await this.noticeModel.create(noticePayload);
      this.eventsGateway.pushNotify(noticePayload.user);
      return 'Create Notice successfully';
    } catch (error) {
      return error.message;
    }
  }

  async getListNotice(userId: string): Promise<Notice[] | string | null> {
    try {
      const data = await this.noticeModel.find({ user: userId });
      return data;
    } catch (error) {
      return 'Something failed';
    }
  }

  async testSocket() {
    try {
      this.eventsGateway.pushNotify('message');
    } catch (error) {
      console.log(error.message);
    }
  }
}
