import { HttpException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import {
  HotelRoom,
  HotelRoomDocument,
} from 'src/mongo/schemas/hotel.room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IHotelRoomService, UpdateRoomsParams } from './hotel.room.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel('HotelRoom')
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  find(id: any): Promise<HotelRoom[]> {
    return this.hotelRoomModel.find({ hotel: id }).exec();
  }

  findById(id: ObjectId): Promise<HotelRoom> {
    return this.hotelRoomModel.findById(id);
  }

  async create(body: Partial<HotelRoom>, files: any): Promise<any> {
    const { hotel, description } = body;

    if (!files) {
      throw new HttpException('Images is required', 400);
    }

    if (!hotel) throw new HttpException('Hotel is required', 400);

    const images = files.map((file) => file.filename);
    return await new this.hotelRoomModel({ images, description, hotel }).save();
  }

  update(data: UpdateRoomsParams): Promise<HotelRoom> {
    return this.hotelRoomModel.findByIdAndUpdate(data.id, data.params).exec();
  }
}
