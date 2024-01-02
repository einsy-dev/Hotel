import { Injectable } from '@nestjs/common';
import {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
} from './hotel.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Hotel } from 'src/mongo/schemas/hotel.schema';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel('Hotel') private readonly hotelModel,
    @InjectModel('HotelRoom') private readonly hotelRoom,
  ) {}
  create(data: any): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
  findById(id: ObjectId): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
  search(params: SearchHotelParams): Promise<Hotel[]> {
    throw new Error('Method not implemented.');
  }
  update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
}
