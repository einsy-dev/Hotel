import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Message } from './message.schema';

export type SupportDocument = Support & Document;
@Schema()
export class Support {
  @Prop({ type: String, required: true })
  user: ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [Message], ref: 'Message', required: true })
  messages: Message[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const SupportSchema = SchemaFactory.createForClass(Support);
