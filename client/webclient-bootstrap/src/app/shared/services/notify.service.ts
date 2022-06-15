import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface notification {
  header: string;
  message?: string;
  style?: string;
  time?: number;
}
@Injectable()
export class NotifySerivce {
  private notify = new BehaviorSubject<notification>({
    header: 'null',
  });

  currentNotify = this.notify.asObservable();

  changeNotify(newState: Partial<notification>) {
    const current = this.notify.getValue();
    newState = Object.assign(current, newState);
    this.notify.next(newState as notification);
  }
}
