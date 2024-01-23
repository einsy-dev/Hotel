import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SupportDocument } from 'src/mongo/schemas/support.schema';
import { Message, MessageDocument } from 'src/mongo/schemas/message.schema';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel('Support') private supportModel: Model<SupportDocument>,
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async getSupports(isActive): Promise<SupportDocument[]> {
    return await this.supportModel.find({ isActive }).exec();
  }
  async getMessages(userId: ObjectId): Promise<Message[]> {
    return await this.supportModel
      .findOne({ user: userId, isActive: true })
      .select(['messages', '-_id'])
      .exec()
      .then((data) => data.messages)
      .catch(() => []);
  }
  async sendMessage(
    userId: string,
    supportId: string,
    message: string,
  ): Promise<void> {
    const newMessage = await new this.messageModel({
      author: userId,
      text: message,
    }).save();

    if (supportId !== undefined) {
      await this.supportModel
        .updateOne({ _id: supportId }, { $push: { messages: newMessage } })
        .select(['user'])
        .exec()
        .then((data) => console.log(data));
    } else {
      await new this.supportModel({
        user: userId,
        messages: [newMessage],
      }).save();
    }
  }
}
