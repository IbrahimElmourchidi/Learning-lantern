import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeI } from 'src/app/shared/interfaces/welcome-status.interface';
import { WelcomeStatusService } from 'src/app/shared/services/welcome-status.service';
/**
 * this component is the entry point for the english module
 */
@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrls: ['./english.component.scss'],
})
export class EnglishComponent {
  /** the status of active link and the side nav */
  welcomeStats: WelcomeI = { activeLink: 'home', sideNav: false };
  /**
   * the constructor
   */
  constructor(
    private welcomeStatus: WelcomeStatusService,
    private router: Router
  ) {
    if (router.url === '/en') router.navigate(['/en/welcome']);
    this.welcomeStatus.currentStatus.subscribe(
      (stats) => (this.welcomeStats = stats)
    );
  }
}
