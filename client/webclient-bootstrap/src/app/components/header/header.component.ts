import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  activeLink = 'home';
  currentMode = localStorage.getItem('view-mode') || 'light';
  toggleMode() {
    let root = document.querySelector('html');
    if (root?.classList.contains('light')) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('view-mode', 'dark');
      this.currentMode = 'dark';
      return;
    }
    root?.classList.remove('dark');
    root?.classList.add('light');
    localStorage.setItem('view-mode', 'light');
    this.currentMode = 'light';
  }

  changeActive(str: string): void {
    this.activeLink = str;
    this.scrollTO(str);
  }

  scrollTO(str: string) {
    document
      .getElementById(str)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
