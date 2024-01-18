import { ObjectId } from 'mongoose';
import { HotelRoom } from 'src/mongo/schemas/hotel.room.schema';

interface SearchRoomsParams {
  limit: number;
  offset: number;
  params: Partial<HotelRoom>;
  isEnabled?: boolean;
}

interface UpdateRoomsParams {
  id: ObjectId;
  params: Partial<HotelRoom>;
}

interface IHotelRoomService {
  find(data: SearchRoomsParams): Promise<HotelRoom[]>;
  findById(id: ObjectId): Promise<HotelRoom>;
  create(data: Partial<HotelRoom>, files: any): Promise<HotelRoom>;
  update(data: UpdateRoomsParams): Promise<HotelRoom>;
  delete(id: ObjectId): Promise<HotelRoom>;
}

export { IHotelRoomService, UpdateRoomsParams, SearchRoomsParams };
