import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './../../users/schemas/users.schema';

export type RoomDocument = mongoose.HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ type: String, required: true })
  roomName: string;
  @Prop({ type: String, required: false })
  description?: string;
  @Prop({ type: [String], required: false })
  listService?: string[];
  @Prop({ type: String, required: true })
  address: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string | null;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
