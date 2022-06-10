import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppState, StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  defaultMode = 'light';
  constructor(
    private state: StateService,
    private jwtService: JwtHelperService
  ) {}
  ngOnInit(): void {
    let currentMode = localStorage.getItem('view-mode');
    if (!this.jwtService.isTokenExpired()) {
      this.state.changeState({
        logedIn: true,
      });
    }
    if (currentMode === 'dark') this.state.changeState({ dark: true });
    let root = document.querySelector('html');
    if (!currentMode) currentMode = this.defaultMode;
    root?.classList.add(currentMode);
  }
}
