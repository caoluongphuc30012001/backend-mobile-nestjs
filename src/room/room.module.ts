import { NoticeModule } from './../notice/notice.module';
import { Room, RoomSchema } from './schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    NoticeModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
