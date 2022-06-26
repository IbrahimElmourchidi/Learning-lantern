import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  MessageI,
  MessagePaginateI,
} from 'src/app/shared/interfaces/message.interface';
import { RoomI, RoomPaginate } from 'src/app/shared/interfaces/room.interface';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { ChatSocket } from 'src/app/shared/sockets/sockets.service';
@Injectable()
export class ChatService {
  appState!: AppState;
  constructor(
    private socket: ChatSocket,
    private appStateService: StateService
  ) {
    socket.connect();
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
