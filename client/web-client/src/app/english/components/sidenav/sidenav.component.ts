import { Component, OnInit } from '@angular/core';
import { WelcomeI } from 'src/app/shared/interfaces/welcome-status.interface';
import { WelcomeStatusService } from 'src/app/shared/services/welcome-status.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: 'sidenav.component.html',
  styleUrls: [],
})
export class SidenavComponent implements OnInit {
  landingStatus: WelcomeI = { activeLink: 'home', sideNav: false };
  constructor(private landingStatusService: WelcomeStatusService) {}

  ngOnInit(): void {
    this.landingStatusService.currentStatus.subscribe(
      (stats) => (this.landingStatus = stats)
    );
  }

  changeActiveTab(str: string) {
    this.landingStatus.activeLink = str;
    this.landingStatus.sideNav = false;
    this.landingStatusService.changeStatus(this.landingStatus);
  }

  closeSidenav() {
    this.landingStatus.sideNav = false;
    this.landingStatusService.changeStatus(this.landingStatus);
  }

  scrollTO(str: string) {
    document
      .getElementById(str)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
