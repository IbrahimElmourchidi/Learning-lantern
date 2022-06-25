import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { RoomI, RoomPaginate } from '../interfaces/room.interface';

export interface AppState {
  logedIn: boolean;
  dark: boolean;
  rooms?: RoomPaginate;
  activeRoom?: RoomI;
  joinedRooms?: RoomI[];
  userName?: string;
}
@Injectable()
export class StateService {
  constructor(private jwtService: JwtHelperService) {}
  private state = new BehaviorSubject<AppState>({
    logedIn: false,
    dark: false,
    userName: this.jwtService.decodeToken(this.jwtService.tokenGetter()).userId,
  });
  currentState = this.state.asObservable();

  changeState(newState: Partial<AppState>) {
    const current = this.state.getValue();
    newState = Object.assign(current, newState);
    this.state.next(newState as AppState);
  }
}
