import { User } from './../../users/schemas/users.schema';
import { Invoice } from './../../invoice/schemas/invoice.schema';
import { Request } from './../../request/schemas/request.schema';
import { Room } from './../../room/schemas/room.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  @Prop({ type: String, required: true })
  noticeType: string;
  @Prop({ type: String, required: true })
  description?: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Room.name,
  })
  room?: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Request.name,
  })
  request?: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Invoice.name,
  })
  invoice?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: string;

  @Prop({ type: Date, default: new Date() })
  createdAt?: Date;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
