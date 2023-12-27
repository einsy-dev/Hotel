import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ReviewDocument } from './review.schema';

export type HotelDocument = Hotel & Document;
@Schema()
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Review' })
  rating: ReviewDocument[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
