import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable()
export class WebSocketService {
  constructor(private socket: Socket) {}

  sendMessage(eventName: string) {
    this.socket.emit(eventName, 'test test');
  }

  getMessage(): Observable<unknown> {
    return this.socket.fromEvent('message');
  }
}
