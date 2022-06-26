import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { RtcSocket } from 'src/app/shared/sockets/sockets.service';

@Injectable()
export class KurentoService {
  appState!: AppState;

  constructor(
    private socket: RtcSocket,
    private appStateService: StateService
  ) {
    socket.connect();
    this.appStateService.currentState.subscribe(
      (state) => (this.appState = state)
    );
  }

  getRtcMessage() {
    console.log('rtc message arrived');
    return this.socket.fromEvent('message');
  }

  emit(eventName: string, data: any) {}
}
