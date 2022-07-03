import { Inject, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AmqpConnectionManager } from 'amqp-connection-manager';

import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { PageI } from 'src/shared/interfaces/page.interface';
import { UserService } from 'src/user/services/user.service';
import { Room } from '../model/entities/room.entity';
import { JoinedRoomI } from '../model/interfaces/joined-room.interface';
import { MessageI } from '../model/interfaces/message.interface';
import { RoomI } from '../model/interfaces/room.interface';
import { ConnectedUserService } from '../services/connected-user.service';
import { JoinedRoomService } from '../services/joined-room.service';
import { MessageService } from '../services/message.service';
import { RoomService } from '../services/room.service';
import { allowedHosts } from './allowed-hosts';

@WebSocketGateway({
  cors: { origin: allowedHosts },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;
  conn = 0;
  halt = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private connectedUserService: ConnectedUserService,
    private joinedRoomService: JoinedRoomService,
    private amqpConnection: AmqpConnection,
    private messagesService: MessageService, // @Inject('chat_serv') private readonly client: ClientProxy, // private readonly rmqService: RMQService,
  ) {}

  async onModuleInit() {
    try {
      await this.connectedUserService.deleteAll();
      await this.joinedRoomService.deleteAll();
    } catch (error) {
      console.log(`cannot refresh database`);
    }
  }

  @SubscribeMessage('getRoomList')
  handleMessage(socket: Socket, payload: any) {
    this.emitRoom(socket);
  }

  // @UseGuards(JwtGuard)
  async handleConnection(socket: Socket, ...args: any[]) {
    console.log('connection request recieved');
    // verify the jwt
    try {
      let veri = await this.authService.verifyJWT(
        socket.handshake.headers.authorization,
      );
      const user = await this.userService.getUserById(veri.userId);
      if (!user) {
        this.disconnect(socket);
      } else {
        // add user data to the socket object
        socket.data.user = user;

        // save connection to database
        await this.connectedUserService.create({
          SocketId: socket.id,
          user: user,
        });
        // emit room to the user
        this.emitRoom(socket);
      }
    } catch (error) {
      this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    //remove connection from DB
    await this.connectedUserService.deleteBySocketId(socket.id);
    await this.joinedRoomService.deleteBySocketId(socket.id);
    // close the socket
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    console.log('sorry you need to disconnect');
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async createRoom(socket: Socket, room: Room) {
    console.log('roomCreation');

    const roomCreated = await this.roomService.createRoom(
      room,
      socket.data.user,
    );
    // try {
    //   this.client.send('newRoom', {
    //     ClassId: roomCreated.Id,
    //     UserId: socket.data.user.Id,
    //   });
    // } catch (error) {
    //   console.log('rabbit error');
    // }
    this.amqpConnection.publish(
      'LearningLantern',
      'newRoom',
      {
        ClassId: roomCreated.Id,
        UserId: socket.data.user.Id,
      },
      {},
    );
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

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, roomId: string) {
    await this.roomService.joinRoom(roomId, socket.data.user);
    // this.client.send('joinRoom', {
    //   UserId: socket.data.user.Id,
    //   ClassId: roomId,
    // });
    this.amqpConnection.publish(
      'LearningLantern',
      'joinRoom',
      {
        ClassId: roomId,
        UserId: socket.data.user.Id,
      },
      {},
    );
    this.emitRoom(socket);
  }

  async emitRoom(socket: Socket) {
    const user = socket.data.user;
    const rooms = await this.roomService.getRoomsForUser(user.Id, {
      page: 1,
      limit: 10,
    });
    socket.emit('rooms', rooms);
  }

  @SubscribeMessage('getRoomMessages')
  async getRoomMessages(socket: Socket, room: RoomI) {
    if (room) {
      const messages = await this.messagesService.findMessagesFromRoom(room, {
        page: 1,
        limit: 10,
      });
      socket.emit('messages', messages);
    }
  }

  @SubscribeMessage('enterRoom')
  async enterRoom(socket: Socket, room: RoomI) {
    await this.joinedRoomService.create({
      SocketId: socket.id,
      user: socket.data.user,
      room,
    });
  }
  OnDestroy;
  @SubscribeMessage('leaveRoom')
  async leaveRoom(socket: Socket) {
    await this.joinedRoomService.deleteBySocketId(socket.id);
  }

  @SubscribeMessage('addMessage')
  async addMessage(socket: Socket, message: MessageI) {
    const createMessage: MessageI = await this.messagesService.create(
      message,
      socket.data.user,
    );
    const room: RoomI = await this.roomService.getRoomById(
      createMessage.room.Id,
    );
    const joinedUser: JoinedRoomI[] = await this.joinedRoomService.findByRoom(
      room,
    );
    for (const user of joinedUser) {
      this.server.to(user.SocketId).emit('newMessage', createMessage);
    }
  }
}
