import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {
  MessageI,
  MessagePaginateI,
} from 'src/app/shared/interfaces/message.interface';
import { RoomI, RoomPaginate } from 'src/app/shared/interfaces/room.interface';
@Injectable()
export class ChatService {
  constructor(private socket: Socket, private jwtService: JwtHelperService) {}

  getNewMessage(): Observable<MessageI> {
    return this.socket.fromEvent<MessageI>('newMessage');
  }

  getMessages(): Observable<MessagePaginateI> {
    return this.socket.fromEvent<MessagePaginateI>('messages');
  }

  sendMessage(message: MessageI) {
    this.socket.emit('addMessage', message);
  }

  joinRoom(room: RoomI) {
    this.socket.emit('joinRoom', room);
  }

  enterRoom(room: RoomI) {
    console.log('enter request to room', room.Name);
    this.socket.emit('enterRoom', room);
  }

  getRoomMessages(room: RoomI) {
    this.socket.emit('getRoomMessages', room);
  }

  leaveRoom(room: RoomI) {
    this.socket.emit('leaveRoom', room);
  }

  getRooms() {
    return this.socket.fromEvent<RoomPaginate>('rooms');
  }

  createRoom(str: string) {
    const room: RoomI = {
      Name: str,
      users: [],
    };
    this.socket.emit('createRoom', room);
  }
}
