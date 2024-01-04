import { HttpException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import {
  HotelRoom,
  HotelRoomDocument,
} from 'src/mongo/schemas/hotel.room.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  IHotelRoomService,
  SearchRoomsParams,
  UpdateRoomsParams,
} from './hotel.room.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel('HotelRoom')
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  find(data: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.hotelRoomModel
      .find(data.params)
      .skip(data.offset)
      .limit(data.limit)
      .exec();
  }

  findById(id: ObjectId): Promise<HotelRoom> {
    return this.hotelRoomModel.findById(id);
  }

  create({
    hotel,
    description,
    images,
  }: Partial<HotelRoom>): Promise<HotelRoom> {
    if (!hotel) throw new HttpException('Hotel is required', 400);
    return new this.hotelRoomModel(hotel, description, images).save();
  }

  update(data: UpdateRoomsParams): Promise<HotelRoom> {
    return this.hotelRoomModel.findByIdAndUpdate(data.id, data.params).exec();
  }

  delete(id: ObjectId): Promise<any> {
    return this.hotelRoomModel.findByIdAndDelete(id).exec();
  }
}
