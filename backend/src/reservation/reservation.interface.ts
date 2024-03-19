import { ObjectId } from 'mongoose';
import { Reservation } from 'src/mongo/schemas/reservation.schema';

interface ReservationDto {
  userId: ObjectId;
  hotelId: ObjectId;
  roomId: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}

interface ReservationSearchOptions {
  userId: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}
interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: ObjectId): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}

export { IReservation };
