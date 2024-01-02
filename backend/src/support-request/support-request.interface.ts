import { ObjectId } from 'mongoose';
import { Message } from 'src/mongo/schemas/message.schema';
import { SupportRequest } from 'src/mongo/schemas/support.request.schema';

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

interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ObjectId): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
}

interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
  closeRequest(supportRequest: ObjectId): Promise<void>;
}

export {
  ISupportRequestService,
  ISupportRequestClientService,
  ISupportRequestEmployeeService,
};
