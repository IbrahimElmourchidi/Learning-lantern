import { Component } from '@angular/core';
/**
 * component that contains the welcome message
 */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  /**
   * scroll to the section with the given name
   * @param str
   */
  scrollTO(str: string) {
    document
      .getElementById(str)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
