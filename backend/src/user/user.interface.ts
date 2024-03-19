import { ObjectId } from 'mongoose';
import { User } from 'src/mongo/schemas/user.schema';

interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  phone: string;
}
interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ObjectId): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}

export { IUserService };
