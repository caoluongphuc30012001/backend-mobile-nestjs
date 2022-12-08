import { Role } from './../../auth/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  fullName: string;
  @Prop({ type: Date, required: false })
  birthDate?: Date;
  @Prop({ type: String, required: true })
  phoneNumber: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: false })
  address: string;
  @Prop({ type: String, required: false })
  avatar: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
