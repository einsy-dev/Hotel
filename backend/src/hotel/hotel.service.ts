import { HttpException, Injectable } from '@nestjs/common';
import { IHotelService } from './hotel.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelDocument } from 'src/mongo/schemas/hotel.schema';
import * as fs from 'fs';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel('Hotel') private readonly hotelModel: Model<HotelDocument>,
  ) {}
  async find({ name, limit, offset }) {
    const quantity = await this.hotelModel
      .countDocuments({ name: RegExp(name, 'i') })
      .exec();
    const data = await this.hotelModel
      .find({ name: RegExp(name, 'i') })
      .limit(limit)
      .skip(offset)
      .exec();
    return { data, limit: quantity };
  }

  async findById(id) {
    return await this.hotelModel
      .findById(id)
      .select(['_id', 'images', 'name', 'description'])
      .exec();
  }
  async create(body, files) {
    const { name, description } = body;

    if (!files) {
      throw new HttpException('Images is required', 400);
    }

    if (!name) throw new HttpException('Name is required', 400);

    const images = files.map((file) => file.filename);
    return await new this.hotelModel({ images, name, description }).save();
  }
  async update(data) {
    const prev = await this.hotelModel.findById(data.id).select(['images']);
    const fiilesToDelete = prev.images.filter(
      (file) => !data.params.images.includes(file),
    );

    if (fiilesToDelete.length) {
      fiilesToDelete.forEach((file) => {
        fs.rmSync(`./public/images/${file}`, { force: true });
      });
    }
    const hotel = await this.hotelModel.findByIdAndUpdate(data.id, data.params);
    return hotel;
  }
}
