import { ObjectId } from 'mongoose';
import { Hotel } from 'src/mongo/schemas/hotel.schema';

interface SearchHotelParams {
  limit: number;
  offset: number;
  name: string;
}

interface UpdateHotelParams {
  id: ObjectId;
  params: Partial<Hotel>;
}

interface IHotelService {
  find(data: SearchHotelParams): Promise<Hotel[]>;
  findById(id: ObjectId): Promise<Hotel>;
  create(data: Partial<Hotel>, files: any): Promise<Hotel>;
  update(data: UpdateHotelParams): Promise<Hotel>;
  delete(id: ObjectId): Promise<Hotel>;
}

export { IHotelService, SearchHotelParams, UpdateHotelParams };
