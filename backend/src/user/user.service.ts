import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/mongo/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly user: Model<UserDocument>,
  ) {}

  async findOne(payload: any) {
    const { valid, ...rest } = payload;
    const user = await this.user
      .findOne(rest)
      .select([
        '_id',
        'name',
        'email',
        'phone',
        'role',
        `${valid && 'password'}`,
      ]);
    return user;
  }

  async findAll() {
    return await this.user.find();
  }

  async create({ name, email, password, phone }: any) {
    const hashPassword = await bcrypt.hash(password, 5);
    return await this.user.create({
      name,
      email,
      password: hashPassword,
      phone,
    });
  }

  async update(payload: any) {
    return await this.user.updateOne(payload);
  }

  async delete(payload: any) {
    return await this.user.deleteOne(payload);
  }
}
