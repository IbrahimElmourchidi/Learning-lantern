import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ChatService {
  constructor(private socket: Socket) {}
  send() {}

  listen(eventName: string) {
    return this.socket.fromEvent(eventName);
  }
}
