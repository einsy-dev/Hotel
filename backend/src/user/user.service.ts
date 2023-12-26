import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/mongo/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly user: Model<UserDocument>,
  ) {}

  async findOne(payload: any) {
    return await this.user.findOne(payload);
  }

  async findAll() {
    return await this.user.find();
  }

  async create(payload: any) {
    return await this.user.create(payload);
  }

  async update(payload: any) {
    return await this.user.updateOne(payload);
  }

  async delete(payload: any) {
    return await this.user.deleteOne(payload);
  }
}
