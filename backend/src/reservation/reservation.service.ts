import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IReservation } from './reservation.interface';
import { Model } from 'mongoose';
import { ReservationDocument } from 'src/mongo/schemas/reservation.schema';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(data) {
    return await new this.reservationModel(data).save();
  }

  async getReservations(query) {
    return await this.reservationModel.find(query).exec();
  }

  async removeReservation(id) {
    await this.reservationModel.findByIdAndDelete(id);
  }
}
