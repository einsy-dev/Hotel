import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ReviewDocument } from './reciew.schema';
import { OrderDocument } from './order.schema';
import { UserDocument } from './user.schema';

export type HotelDocument = Hotel & Document;
@Schema()
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Review' })
  rating: ReviewDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orders: OrderDocument[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
