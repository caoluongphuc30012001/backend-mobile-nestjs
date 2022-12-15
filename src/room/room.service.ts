import { NoticeType } from './../notice/enums/notice-type.enum';
import { Notice } from './../notice/schemas/notice.schema';
import { NoticeService } from './../notice/notice.service';
import { ModifyRoom } from './dtos/modify-room.dto';
import { CreateRoom } from './dtos/create-room.dto';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    private readonly noticeService: NoticeService,
  ) {}

  async createRoom(roomCreate: CreateRoom): Promise<string> {
    try {
      await this.roomModel.create(roomCreate);
      return 'Create room successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async getListRoom({
    status,
    sortBy = 'roomName',
    sortType = 'desc',
    priceFrom = 0,
    priceTo = Number.MAX_SAFE_INTEGER,
    service,
  }: any): Promise<Room[] | string | undefined> {
    try {
      const props = service
        ? {
            listService: service,
          }
        : {};
      const typeSort = sortType === 'desc' ? -1 : 1;
      if (status === 'available') {
        const data = await this.roomModel
          .find({
            user: null,
            price: {
              $gte: priceFrom,
              $lte: priceTo,
            },
            ...props,
          })
          .sort({
            [sortBy]: typeSort,
          })
          .select('-description -user');

        return data;
      } else if (status === 'owned') {
        const data = await this.roomModel
          .find({
            user: { $ne: null },
            price: {
              $gte: priceFrom,
              $lte: priceTo,
            },
            ...props,
          })
          .select('-description -user')
          .sort({
            [sortBy]: typeSort,
          });

        return data;
      } else {
        const data = await this.roomModel
          .find({
            price: {
              $gte: priceFrom,
              $lte: priceTo,
            },
            ...props,
          })
          .select('-description -user')
          .sort({
            [sortBy]: typeSort,
          });

        return data;
      }
    } catch (error) {
      return 'Something failed';
    }
  }

  async getPromos(): Promise<Room[] | string | undefined> {
    try {
      const data = await this.roomModel
        .find({
          user: null,
        })
        .sort({
          price: 1,
        })
        .limit(5)
        .select('-description -user');
      return data;
    } catch (error) {
      return 'Something failed';
    }
  }

  async getRoomInformation(roomId: string): Promise<Room | string | null> {
    try {
      const data = await this.roomModel.findById(roomId).populate({
        path: 'user',
        select: '-password -role',
      });
      return data;
    } catch (error) {
      return 'Something failed';
    }
  }

  async updateRoomInformation(roomPayload: ModifyRoom): Promise<string> {
    try {
      await this.roomModel.findByIdAndUpdate(roomPayload.roomId, roomPayload);
      return 'Modify room information successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async deleteRoom(roomId: string): Promise<string> {
    try {
      await this.roomModel.findByIdAndDelete(roomId);
      return 'Delete room successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async rentRoom(roomId: string, userId: string): Promise<string> {
    try {
      await this.roomModel.findByIdAndUpdate(roomId, {
        user: userId,
      });

      const noticePayload: Notice = {
        noticeType: NoticeType.Rent,
        user: process.env.ADMIN_ID as string,
        description: 'Thuê phòng',
        room: roomId,
      };
      const rs = await this.noticeService.createNotice(noticePayload);
      return rs;
    } catch (error) {
      return 'Something failed';
    }
  }
}
