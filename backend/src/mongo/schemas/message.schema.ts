import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type MessageDocument = Message & Document;
@Schema()
export class Message {
  @Prop({ type: String, required: true })
  author: ObjectId;

  @Prop({ type: Date, default: Date.now })
  sentAt: Date;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Date })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
