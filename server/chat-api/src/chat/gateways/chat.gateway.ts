import { UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { PageI } from 'src/shared/interfaces/page.interface';
import { UserService } from 'src/user/services/user.service';
import { RoomI } from '../model/interfaces/room.interface';
import { RoomService } from '../services/room.service';

import { allowedHosts } from './allowed-hosts';

@WebSocketGateway({
  cors: { origin: allowedHosts },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  conn = 0;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
  ) {}
  @SubscribeMessage('hello')
  handleMessage(client: Socket, payload: any): string {
    return 'ok in shaa allah';
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    try {
      let veri = await this.authService.verifyJWT(
        socket.handshake.headers.authorization,
      );
      const user = await this.userService.getUserById(veri.userId);
      if (!user) {
        console.log('unauthorized');
        this.disconnect(socket);
      } else {
        socket.data.user = user;
        const rooms = await this.roomService.getRoomsForUser(user.Id, {
          page: 1,
          limit: 10,
        });
        socket.emit('rooms', rooms);
      }
    } catch (error) {
      this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async createRoom(socket: Socket, room: RoomI): Promise<RoomI> {
    console.log(room);
    return this.roomService.createRoom(room, socket.data.user);
  }

  @SubscribeMessage('roomPaginate')
  async onPaginationRoom(socket: Socket, page: PageI) {
    page.limit = page.limit < 20 ? page.limit : 20;
    const rooms = await this.roomService.getRoomsForUser(
      socket.data.user,
      page,
    );
    socket.emit('rooms', rooms);
  }
}
