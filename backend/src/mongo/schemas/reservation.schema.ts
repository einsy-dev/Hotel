import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Date, Document, ObjectId } from 'mongoose';

export type ReservationDocument = Reservation & Document;
@Schema()
export class Reservation {
  @Prop({ type: String, required: true })
  userId: ObjectId;

  @Prop({ type: String, required: true })
  hotelId: ObjectId;

  @Prop({ type: String, required: true })
  roomId: ObjectId;

  @Prop({ type: Date, required: true })
  dateStart: Date;

  @Prop({ type: Date, required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
