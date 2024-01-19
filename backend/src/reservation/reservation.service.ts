import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IReservation,
  ReservationDto,
  ReservationSearchOptions,
} from './reservation.interface';
import { Schema } from 'mongoose';
import { Reservation } from 'src/mongo/schemas/reservation.schema';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    return await new this.reservationModel(data).save();
  }

  async removeReservation(id: Schema.Types.ObjectId): Promise<void> {
    return await this.reservationModel.deleteOne({ _id: id });
  }
  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    return await this.reservationModel
      .find({
        userId: filter.userId,
        dateStart: { $gte: filter.dateStart },
        dateEnd: { $lte: filter.dateEnd },
      })
      .exec();
  }
}
