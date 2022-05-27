import { Component, HostListener } from '@angular/core';
import { WelcomeI } from './shared/interfaces/welcome-status.interface';
import { WelcomeStatusService } from './shared/services/welcome-status.service';

/**
 * this is the bootstrap component for the app which is the start point (like main function in c#)
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  /**
   * this variable contains the current status of the active link & sidenav
   *
   */
  welcomeStats: WelcomeI = { activeLink: 'home', sideNav: false };
  /**
   *
   * the constructor injects the welcome status service which is used to
   * get the status of the current active link and the side bar status
   *
   * @param welcomeStatus
   */
  constructor(private welcomeStatus: WelcomeStatusService) {
    this.welcomeStatus.currentStatus.subscribe(
      (stats) => (this.welcomeStats = stats)
    );
  }
  /**
   *
   * this host listener is used to hide the side bar when moving from mobile
   * view to desktop view
   *
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 900) this.hideSideNav();
  }

  /**
   * this function hides the side nav
   */
  hideSideNav() {
    this.welcomeStats.sideNav = false;
    this.welcomeStatus.changeStatus(this.welcomeStats);
  }
}
