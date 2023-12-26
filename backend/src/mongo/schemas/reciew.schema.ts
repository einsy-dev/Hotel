import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;
@Schema()
export class Review {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  text: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
