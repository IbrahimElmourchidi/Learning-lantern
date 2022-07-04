import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifySerivce } from 'src/app/shared/services/notify.service';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-class-inside',
  templateUrl: 'class-inside.component.html',
  styleUrls: ['class-inside.component.scss'],
})
export class ClassInsideComponent implements OnInit {
  active = 'chat';
  appState!: AppState;
  title!: string;
  classId!: string;
  constructor(
    private appStateService: StateService,
    private notify: NotifySerivce,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.classId = this.route.snapshot.paramMap.get('classId') || '';
    this.appStateService.currentState.subscribe((data) => {
      this.appState = data;
      this.title = this.appState.activeRoom?.Name || 'Class Title';
    });
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

  copyClassId() {
    navigator.clipboard.writeText(this.classId);
    this.notify.changeNotify({
      header: 'Class Id copied',
      time: 3000,
    });
  }
}
