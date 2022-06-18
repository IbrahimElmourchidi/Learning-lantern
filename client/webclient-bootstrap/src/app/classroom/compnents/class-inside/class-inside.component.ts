import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-class-inside',
  templateUrl: 'class-inside.component.html',
  styleUrls: ['class-inside.component.scss'],
})
export class ClassInsideComponent implements OnInit {
  active = 'chat';
  appState!: AppState;

  constructor(private appStateService: StateService) {}

  ngOnInit(): void {
    this.appStateService.currentState.subscribe(
      (data) => (this.appState = data)
    );
  }
  changeActive(str: string) {
    this.active = str;
  }

  toggleMode() {
    let root = document.querySelector('html');
    if (root?.classList.contains('light')) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('view-mode', 'dark');
      this.appStateService.changeState({ dark: true });
      return;
    }
    root?.classList.remove('dark');
    root?.classList.add('light');
    localStorage.setItem('view-mode', 'light');
    this.appStateService.changeState({ dark: false });
  }
}
