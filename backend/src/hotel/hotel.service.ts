import { HttpException, Injectable } from '@nestjs/common';
import {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
} from './hotel.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Hotel, HotelDocument } from 'src/mongo/schemas/hotel.schema';
import * as fs from 'fs';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel('Hotel') private readonly hotelModel: Model<HotelDocument>,
  ) {}
  async find(
    params: SearchHotelParams,
  ): Promise<{ data: Hotel[]; limit: number }> {
    const limit = await this.hotelModel
      .countDocuments({ name: RegExp(params.name, 'i') })
      .exec();
    const data = await this.hotelModel
      .find({ name: RegExp(params.name, 'i') })
      .skip(params.offset)
      .limit(params.limit)
      .exec();
    return { data, limit };
  }

  async findById(id: ObjectId): Promise<Hotel> {
    return await this.hotelModel
      .findById(id)
      .select(['_id', 'images', 'name', 'description'])
      .exec();
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
  async update(data: UpdateHotelParams): Promise<any> {
    const prev = await this.hotelModel.findById(data.id).select(['images']);
    const fiilesToDelete = prev.images.filter(
      (file) => !data.params.images.includes(file),
    );

    if (fiilesToDelete.length) {
      fiilesToDelete.forEach((file) => {
        fs.rmSync(`./public/images/${file}`, { force: true });
      });
    }
    await this.hotelModel.findByIdAndUpdate(data.id, data.params);
    return { message: 'ok' };
  }
  async delete(id: ObjectId): Promise<any> {
    return await this.hotelModel.findByIdAndDelete(id).exec();
  }
}
