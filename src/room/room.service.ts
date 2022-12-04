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
  ) {}

  async createRoom(roomCreate: CreateRoom): Promise<string> {
    try {
      await this.roomModel.create(roomCreate);
      return 'Create room successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async getListRoom(status: string): Promise<Room[] | string | undefined> {
    try {
      if (status === 'available') {
        const data = await this.roomModel
          .find({
            user: null,
          })
          .select(['-description -user']);

        return data;
      } else if (status === 'owned') {
        const data = await this.roomModel
          .find({
            user: { $ne: null },
          })
          .select(['-description -user']);

        return data;
      } else {
        const data = await this.roomModel
          .find({})
          .select(['-description -user']);

        return data;
      }
    } catch (error) {
      return 'Something failed';
    }
  }

  async getRoomInformation(roomId: string): Promise<Room | string | null> {
    try {
      const data = await this.roomModel.findById(roomId).populate('user');
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
}
