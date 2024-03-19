import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HotelRoomDocument } from 'src/mongo/schemas/hotel.room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IRoomService } from './room.interface';
import * as fs from 'fs';

@Injectable()
export class RoomService implements IRoomService {
  constructor(
    @InjectModel('Room')
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  find(id) {
    return this.hotelRoomModel.find({ hotel: id }).exec();
  }

  findById(id) {
    return this.hotelRoomModel.findById(id);
  }

  async create(body, files) {
    const { hotel, description } = body;

    if (!files) {
      throw new HttpException('Images is required', 400);
    }

    if (!hotel) throw new HttpException('Hotel is required', 400);

    const images = files.map((file) => file.filename);
    return await new this.hotelRoomModel({ images, description, hotel }).save();
  }

  async update(data) {
    const prev = await this.hotelRoomModel.findById(data.id).select(['images']);
    const fiilesToDelete = prev.images.filter(
      (file) => !data.params.images.includes(file),
    );

    if (fiilesToDelete.length) {
      fiilesToDelete.forEach((file) => {
        fs.rmSync(`./public/images/${file}`, { force: true });
      });
    }
    return this.hotelRoomModel.findByIdAndUpdate(data.id, data.params).exec();
  }
}
