import { ObjectId } from 'mongoose';
import { User } from 'src/mongo/schemas/user.schema';

interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ObjectId): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}

export { IUserService };
