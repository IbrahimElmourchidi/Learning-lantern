import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Socket } from 'ngx-socket-io';
import { PayloadI } from 'src/app/shared/interfaces/payload.interface';
import { RoomI, RoomPaginate } from 'src/app/shared/interfaces/room.interface';
import { UserI } from 'src/app/shared/interfaces/user.interface';
@Injectable()
export class ChatService {
  constructor(private socket: Socket, private jwtService: JwtHelperService) {}
  send() {}

  listen(eventName: string) {
    return this.socket.fromEvent<any>(eventName);
  }

  createRoom(str: string) {
    const room: RoomI = {
      Name: str,
      users: [],
    };
    this.socket.emit('createRoom', room);
  }

  getRooms() {
    return this.socket.fromEvent<RoomPaginate>('rooms');
  }
}