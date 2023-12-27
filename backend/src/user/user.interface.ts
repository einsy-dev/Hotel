import { ObjectId } from 'mongoose';
import { User } from 'src/mongo/schemas/user.schema';

interface UserSearchParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}
interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ObjectId): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: UserSearchParams): Promise<User[]>;
}

export { IUserService, UserSearchParams };
