import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppState {
  logedIn: boolean;
  dark: boolean;
}
@Injectable()
export class StateService {
  private state = new BehaviorSubject<AppState>({
    logedIn: false,
    dark: false,
  });
  currentState = this.state.asObservable();

  changeState(newState: Partial<AppState>) {
    const current = this.state.getValue();
    newState = Object.assign(current, newState);
    this.state.next(newState as AppState);
    console.log(this.state.getValue());
  }
}
