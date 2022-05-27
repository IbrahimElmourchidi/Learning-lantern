import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WelcomeI } from '../interfaces/welcome-status.interface';

@Injectable()
export class WelcomeStatusService {
  private status = new BehaviorSubject<WelcomeI>({
    activeLink: 'home',
    sideNav: false,
  });
  currentStatus = this.status.asObservable();

  changeStatus(newStatus: WelcomeI) {
    this.status.next(newStatus);
  }
}
