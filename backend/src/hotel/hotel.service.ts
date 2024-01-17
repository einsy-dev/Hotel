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
  async find(data: SearchHotelParams): Promise<Hotel[]> {
    return await this.hotelModel
      .find({ name: RegExp(data.name, 'i') })
      .skip(data.offset)
      .limit(data.limit)
      .exec();
  }
  async findById(id: ObjectId): Promise<Hotel> {
    return await this.hotelModel.findById(id).exec();
  }
  async create(body: Partial<Hotel>, files: any): Promise<any> {
    const { name, description } = body;

    if (!files) {
      throw new HttpException('Images is required', 400);
    }

    if (!name) throw new HttpException('Name is required', 400);

    const images = files.map((file) => file.filename);
    return await new this.hotelModel({ images, name, description }).save();
  }
  async update(data: UpdateHotelParams): Promise<Hotel> {
    return await this.hotelModel.findByIdAndUpdate(data.id, data.params).exec();
  }
  async delete(id: ObjectId): Promise<any> {
    return await this.hotelModel.findByIdAndDelete(id).exec();
  }
}
