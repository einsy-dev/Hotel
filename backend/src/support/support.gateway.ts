import { UserService } from 'src/user/user.service';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SupportService } from './support.service';

@WebSocketGateway()
export class SupportGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private users = {};
  constructor(
    private readonly userService: UserService,
    private readonly supportService: SupportService,
  ) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: any) {
    const { userId } = client.handshake.query;
    const { role } = await this.userService.findById(userId);

    this.users = { ...this.users, [userId]: { socketId: client.id, role } };
    if (role === 'client') {
      const messages = await this.supportService.getMessages(userId);
      this.server.to(client.id).emit('message', messages);
    } else {
      const supports = await this.supportService.getSupports(true);
      this.server.to(client.id).emit('message', supports);
    }
  }

  async handleDisconnect(client: any) {
    const { userId } = client.handshake.query;
    delete this.users[userId];
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, message: any) {
    const { userId, supportId } = client.handshake.query;
    await this.supportService.sendMessage(userId, supportId, message);
    const recivers = [];
    for (const user in this.users) {
      if (this.users[user].role !== 'client') {
        recivers.push(this.users[user].socketId);
      }
    }
    this.server.to(recivers).emit('message', message);
  }
}
