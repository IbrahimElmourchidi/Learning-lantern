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

import { allowedHosts } from './allowed-hosts';

@WebSocketGateway({
  cors: { origin: allowedHosts },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  conn = 0;
  constructor(private authService: AuthService) {}
  @SubscribeMessage('hello')
  handleMessage(client: Socket, payload: any): string {
    return 'ok in shaa allah';
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    try {
      let veri = await this.authService.verifyJWT(
        socket.handshake.headers.authorization,
      );
    } catch (error) {
      this.disconnect(socket);
    }
    this.server.emit('hello', 'counter: ' + ++this.conn);
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }
}
