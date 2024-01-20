import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/mongo/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel('User') private readonly user: Model<UserDocument>,
  ) {}

  async findById(id) {
    return await this.user
      .findById(id)
      .select(['_id', 'name', 'email', 'phone', 'role']);
  }
  async findByEmail(email) {
    return await this.user
      .findOne({ email: email })
      .select(['_id', 'name', 'email', 'phone', 'role', 'password']);
  }

  async findAll() {
    return await this.user.find();
  }

  async create({ name, email, password, phone }: any) {
    const hashPassword = await bcrypt.hash(password, 5);
    return await new this.user({
      name,
      email,
      password: hashPassword,
      phone,
    }).save();
  }
}
