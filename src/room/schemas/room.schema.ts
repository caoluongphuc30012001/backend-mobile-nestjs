import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './../../users/schemas/users.schema';

export type RoomDocument = mongoose.HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  roomName: string;
  @Prop()
  description: string;
  @Prop()
  listService: string[];
  @Prop()
  address: string;
  @Prop()
  price: number;
  @Prop()
  image: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
