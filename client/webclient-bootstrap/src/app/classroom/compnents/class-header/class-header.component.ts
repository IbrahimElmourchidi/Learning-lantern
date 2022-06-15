import { Component } from '@angular/core';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-class-header',
  templateUrl: 'class-header.component.html',
  styleUrls: ['class-header.component.scss'],
})
export class ClassHeaderComponent {
  appState!: AppState;
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
}
