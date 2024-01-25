import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SupportDocument } from 'src/mongo/schemas/support.schema';
import { MessageDocument } from 'src/mongo/schemas/message.schema';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel('Support') private supportModel: Model<SupportDocument>,
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async getActiveSupports(): Promise<SupportDocument[]> {
    return await this.supportModel.find({ isActive: true });
  }

  async getSupportByUserId(userId: ObjectId): Promise<SupportDocument> {
    const isExist = await this.supportModel.exists({
      user: userId,
      isActive: true,
    });
    if (isExist) {
      return await this.supportModel.findById(isExist);
    } else {
      const newMessage = await new this.messageModel({
        author: '65b2345cba5f0ee05624d16fs',
        text: 'Здравствуйте, чем могу вам помочь?',
      }).save();
      return await new this.supportModel({
        user: userId,
        isActive: true,
        messages: newMessage,
      }).save();
    }
  }

  async sendMessage(
    userId: string,
    supportId: string,
    message: string,
  ): Promise<any> {
    const newMessage = await new this.messageModel({
      author: userId,
      text: message,
    }).save();

    return await this.supportModel
      .findByIdAndUpdate(supportId, {
        $push: { messages: newMessage },
      })
      .then((data) => ({ user: data.user, message: newMessage }));
  }
}
