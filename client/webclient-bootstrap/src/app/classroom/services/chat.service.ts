import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {
  MessageI,
  MessagePaginateI,
} from 'src/app/shared/interfaces/message.interface';
import { RoomI, RoomPaginate } from 'src/app/shared/interfaces/room.interface';
import { AppState, StateService } from 'src/app/shared/services/state.service';
@Injectable()
export class ChatService {
  appState!: AppState;
  constructor(
    private socket: Socket,
    private jwtService: JwtHelperService,
    private appStateService: StateService
  ) {
    this.appStateService.currentState.subscribe(
      (state) => (this.appState = state)
    );
  }

  listen(eventName: string): Observable<any> {
    return this.socket.fromEvent<any>(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

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
    if (this.appState.joinedRooms?.includes(room)) return;
    this.appState.joinedRooms?.push(room);
    this.appStateService.changeState(this.appState);
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

  getRoomList() {
    return this.socket.emit('getRoomList');
  }

  createRoom(str: string) {
    const room: RoomI = {
      Name: str,
      users: [],
    };
    this.socket.emit('createRoom', room);
  }
}
