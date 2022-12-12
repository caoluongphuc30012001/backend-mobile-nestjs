import { Room } from './../../room/schemas/room.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop({ type: Number, required: true })
  amountOfWater: number;
  @Prop({ type: Number, required: true })
  priceOfWater: number;
  @Prop({ type: Number, required: true })
  amountOfElectric: number;
  @Prop({ type: Number, required: true })
  priceOfElectric: number;
  @Prop({ type: Boolean, default: false })
  isPay?: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Room.name,
    required: true,
  })
  room: string;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date, required: true })
  endDate: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
