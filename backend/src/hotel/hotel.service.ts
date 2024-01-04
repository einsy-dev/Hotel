import { HttpException, Injectable } from '@nestjs/common';
import {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
} from './hotel.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Hotel, HotelDocument } from 'src/mongo/schemas/hotel.schema';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel('Hotel') private readonly hotelModel: Model<HotelDocument>,
  ) {}
  find(data: SearchHotelParams): Promise<Hotel[]> {
    return this.hotelModel
      .find(data.params)
      .skip(data.offset)
      .limit(data.limit)
      .exec();
  }
  findById(id: ObjectId): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }
  create({ name, description }: Partial<Hotel>): Promise<any> {
    if (!name) throw new HttpException('Name is required', 400);
    return new this.hotelModel({ name, description }).save();
  }
  update(data: UpdateHotelParams): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(data.id, data.params).exec();
  }
  delete(id: ObjectId): Promise<any> {
    return this.hotelModel.findByIdAndDelete(id).exec();
  }
}
