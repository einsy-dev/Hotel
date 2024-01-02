import { ObjectId } from 'mongoose';
import { HotelRoom } from 'src/mongo/schemas/hotel.room.schema';
import { Hotel } from 'src/mongo/schemas/hotel.schema';

interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

interface UpdateHotelParams {
  title: string;
  description: string;
}

interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ObjectId): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel>;
}

interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: ObjectId;
  isEnabled?: boolean;
}

interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ObjectId): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom>;
}

export {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
  IHotelRoomService,
  SearchRoomsParams,
};
