import { Component, OnInit } from '@angular/core';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeLink = 'home';
  appState!: AppState;
  notifyState!: Notification;
  constructor(private state: StateService) {}
  ngOnInit(): void {
    this.state.currentState.subscribe((state) => (this.appState = state));
  }
  toggleMode() {
    let root = document.querySelector('html');
    if (root?.classList.contains('light')) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('view-mode', 'dark');
      this.state.changeState({ dark: true });
      return;
    }
    root?.classList.remove('dark');
    root?.classList.add('light');
    localStorage.setItem('view-mode', 'light');
    this.state.changeState({ dark: false });
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

  logmeout() {
    localStorage.removeItem('token');
  }
}
