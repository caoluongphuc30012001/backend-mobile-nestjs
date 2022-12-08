import { Room } from './../../room/schemas/room.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RequestDocument = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop({ type: String, required: true })
  titleRequest: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name })
  room: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
