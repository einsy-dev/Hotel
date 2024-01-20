import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IReservation, ReservationDto } from './reservation.interface';
import { Reservation } from 'src/mongo/schemas/reservation.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    return await new this.reservationModel(data).save();
  }

  async getAllUserReservations(id: ObjectId): Promise<Reservation[]> {
    return await this.reservationModel
      .find({
        userId: id,
      })
      .exec();
  }
  async removeReservation(id: ObjectId): Promise<void> {
    return await this.reservationModel.findByIdandDelete(id);
  }
}
