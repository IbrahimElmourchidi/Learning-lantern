import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './shared/services/token.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { PlaceHolderDirective } from './shared/directeives/placeholder.directive';
import { PayloadI, RoleEnum } from './shared/interfaces/payload.interface';
import { notification, NotifySerivce } from './shared/services/notify.service';
import { AppState, StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(PlaceHolderDirective, { static: true })
  placeholder!: PlaceHolderDirective;
  defaultMode = 'light';
  notificationComponent!: Notification;
  counter = 0;

  constructor(
    private state: StateService,
    private notify: NotifySerivce,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.tokenService.isLoggedIn();
    this.tokenService.tokenParser(localStorage.getItem('token') || '');
    let currentMode = localStorage.getItem('view-mode');
    if (currentMode === 'dark') this.state.changeState({ dark: true });
    let root = document.querySelector('html');
    if (!currentMode) currentMode = this.defaultMode;
    root?.classList.add(currentMode);
    this.notify.currentNotify.subscribe((data) => this.openAlert(data));
  }
  openAlert(data: notification) {
    if (data.header !== 'null') {
      const viewContainerRef = this.placeholder.viewContainerRef;
      // viewContainerRef.clear();
      const theC = viewContainerRef.createComponent(AlertComponent);
      theC.instance.header = data.header;
      theC.instance.message = data.message || '';
      theC.instance.style = data.style || '';
      setTimeout(() => {
        theC.destroy();
      }, data.time || 3000);
      this.notify.changeNotify({
        header: 'null',
        message: '',
        style: '',
        time: 0,
      });
    }
  }
}
