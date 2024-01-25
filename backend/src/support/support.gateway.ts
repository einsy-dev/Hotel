import { UserService } from 'src/user/user.service';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SupportService } from './support.service';

@WebSocketGateway({ cors: true })
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
    this.users = { ...this.users, [client.id]: { userId: userId, role } };
    console.log(this.users);
    if (role === 'client') {
      const userSupport = await this.supportService.getSupportByUserId(userId);
      this.server.to(client.id).emit('init', userSupport);
    } else {
      const supports = await this.supportService.getActiveSupports();
      this.server.to(client.id).emit('init', supports);
    }
  }

  async handleDisconnect(client: any) {
    console.log('disconnected');
    delete this.users[client.id];
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    const { supportId, message } = payload;
    await this.supportService
      .sendMessage(this.users[client.id].userId, supportId, message)
      .then(({ user, message }) => {
        const recepients = [];
        for (const el in this.users) {
          if (
            this.users[el].role !== 'client' ||
            user === this.users[el].userId
          )
            recepients.push(el);
        }
        console.log(recepients);
        this.server.to(recepients).emit('message', { message, supportId });
      });
  }
}
