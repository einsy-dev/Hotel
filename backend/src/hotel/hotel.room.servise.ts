import { Injectable } from '@nestjs/common';
import { IHotelRoomService, SearchRoomsParams } from './hotel.interface';
import { ObjectId, Schema } from 'mongoose';
import { HotelRoom } from 'src/mongo/schemas/hotel.room.schema';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    throw new Error('Method not implemented.');
  }
  findById(id: Schema.Types.ObjectId): Promise<HotelRoom> {
    throw new Error('Method not implemented.');
  }
  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    throw new Error('Method not implemented.');
  }
  update(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom> {
    throw new Error('Method not implemented.');
  }
}
