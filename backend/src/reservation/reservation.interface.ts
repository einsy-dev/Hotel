import { ObjectId } from 'mongoose';
import { Reservation } from 'src/mongo/schemas/reservation.schema';

interface ReservationDto {
  userId: ObjectId;
  hotelId: ObjectId;
  roomId: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}
interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservation>;
  getAllUserReservations(id: ObjectId): Promise<Array<Reservation>>;
  removeReservation(id: ObjectId): Promise<void>;
}

export { ReservationDto, IReservation };
