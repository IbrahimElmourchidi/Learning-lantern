import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OpenVidu, OpenViduRole } from 'openvidu-node-client';
import { Socket, Server } from 'socket.io';
import { allowedHosts } from './allowed-hosts';

@WebSocketGateway({
  cors: { origin: allowedHosts },
})
export class OVGateway {
  @WebSocketServer()
  io: Server;

  constructor() {}
}
