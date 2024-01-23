import { ObjectId } from 'mongoose';
import { Message } from 'src/mongo/schemas/message.schema';
import { Support } from 'src/mongo/schemas/support.schema';

interface CreateSupportRequestDto {
  user: ObjectId;
  text: string;
}

interface SendMessageDto {
  author: ObjectId;
  supportRequest: ObjectId;
  text: string;
}
interface MarkMessagesAsReadDto {
  user: ObjectId;
  supportRequest: ObjectId;
  createdBefore: Date;
}

interface GetChatListParams {
  user: ObjectId | null;
  isActive: boolean;
}

interface ISupportService {
  findSupportRequests(params: GetChatListParams): Promise<Support[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ObjectId): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: Support, message: Message) => void,
  ): () => void;
}

interface ISupportClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<Support>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
}

interface ISupportEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
  closeRequest(supportRequest: ObjectId): Promise<void>;
}

export {
  ISupportService,
  ISupportClientService,
  ISupportEmployeeService,
  CreateSupportRequestDto,
  SendMessageDto,
  MarkMessagesAsReadDto,
  GetChatListParams,
};
