import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotel.schema';

export type HotelRoomDocument = HotelRoom & Document;
@Schema()
export class HotelRoom {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: Hotel;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isAnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
