import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WelcomeI } from 'src/app/shared/interfaces/welcome-status.interface';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { WelcomeStatusService } from 'src/app/shared/services/welcome-status.service';
/**
 * this is the component for the header used throw all the website except for
 * the classroom
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** the activelink and sidenav status */
  welcomeStats: WelcomeI = { activeLink: 'home', sideNav: false };
  /** if true show the login button else show the username drop down */
  showLogin = false;
  /**
   * the constructor
   * @param welcomeStatus the status of the activelink and sidenav
   * @param router to redirect
   * @param snackBar to show notifications
   */
  constructor(
    private welcomeStatus: WelcomeStatusService,
    private router: Router,
    private snackBar: SnackbarService,
    private jwtHelper:JwtHelperService
  ) {
    this.welcomeStatus.currentStatus.subscribe(
      (stats) => (this.welcomeStats = stats)
    );
  }

  /**
   * check if the user have token then hide the login button
   */
  ngOnInit(): void {
    this.showLogin = this.jwtHelper.isTokenExpired()
  }
  /** change the currnt active link */
  changeActive(str: string) {
    this.welcomeStats.activeLink = str;
    this.welcomeStatus.changeStatus(this.welcomeStats);
  }

  /** toggle the side nav */
  toggleSideNav() {
    this.welcomeStats.sideNav = !this.welcomeStats.sideNav;
    this.welcomeStatus.changeStatus(this.welcomeStats);
  }

  /** scroll to a section with the given name in the welcome component */
  scrollTO(str: string) {
    document
      .getElementById(str)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * log out
   */
  logout() {
    localStorage.removeItem('token');
    this.router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/en/welcome']);
      });
    this.snackBar.openSnackBar('logout successfully');
  }
}
