import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { KurentoService } from 'src/services/kurento.service';
import { allowedHosts } from './allowed-hosts';

@WebSocketGateway({
  cors: { origin: allowedHosts },
})
export class KurentoGateway {
  @WebSocketServer()
  io: Server;

  constructor(private kurentoService: KurentoService) {}
  @SubscribeMessage('message')
  handleMessage(socket: Socket, message: any) {
    switch (message.event) {
      case 'joinRoom':
        this.kurentoService.joinRoom(
          this.io,
          socket,
          message.userName,
          message.roomName,
        );
        break;
      case 'recieveVideoFrom':
        this.kurentoService.recieveVideoFrom(
          socket,
          message.userId,
          message.userName,
          message.sdpOffer,
        );
        break;
      case 'candidate':
        this.kurentoService.addIceCandidate(
          socket,
          message.userId,
          message.roomName,
          message.candidate,
        );
        break;
    }
  }
}
