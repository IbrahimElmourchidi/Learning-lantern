import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomI, RoomPaginate } from '../interfaces/room.interface';

export interface AppState {
  logedIn: boolean;
  dark: boolean;
  rooms?: RoomPaginate;
  activeRoom?: RoomI;
  joinedRooms?: RoomI[];
  editorOn: boolean;
  activeLesson?: string;
}
@Injectable()
export class StateService {
  constructor() {}
  private state = new BehaviorSubject<AppState>({
    logedIn: false,
    dark: false,
    editorOn: false,
  });
  currentState = this.state.asObservable();

  changeState(newState: Partial<AppState>) {
    const current = this.state.getValue();
    newState = Object.assign(current, newState);
    this.state.next(newState as AppState);
  }
}
