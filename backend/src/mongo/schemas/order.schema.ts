import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { UserDocument } from './user.schema';
import { HotelDocument } from './hotel.schema';

export type OrderDocument = Order & Document;
@Schema()
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: HotelDocument;

  @Prop({ required: true })
  from: Date;

  @Prop({ required: true })
  to: Date;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  room: string;

  @Prop()
  options: string[];

  @Prop()
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
