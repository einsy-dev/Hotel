import { OrderDocument } from './order.schema';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ReviewDocument } from './reciew.schema';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orders: OrderDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  history: OrderDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Review' })
  rating: ReviewDocument[];

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
