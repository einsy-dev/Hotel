import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Date, Document, ObjectId } from 'mongoose';

export type ReservationDocument = Reservation & Document;
@Schema()
export class Reservation {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  hotelId: ObjectId;

  @Prop({ required: true })
  roomId: ObjectId;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
