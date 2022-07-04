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
  editorClosed: boolean;
  activeLesson?: string;
  lessonChange: boolean;
  newVideoId?: string;
  videoToDelete?: string;
}
@Injectable()
export class StateService {
  constructor() {}
  private state = new BehaviorSubject<AppState>({
    logedIn: false,
    dark: false,
    editorOn: false,
    editorClosed: false,
    lessonChange: false,
  });
  currentState = this.state.asObservable();

  changeState(newState: Partial<AppState>) {
    const current = this.state.getValue();
    newState = Object.assign(current, newState);
    this.state.next(newState as AppState);
  }
}
