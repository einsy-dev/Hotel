import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Message } from './message.schema';

export type SupportRequestDocument = SupportRequest & Document;
@Schema()
export class SupportRequest {
  @Prop({ required: true })
  user: ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  messages: Message[];

  @Prop({ required: true })
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
