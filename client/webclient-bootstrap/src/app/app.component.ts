import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  defaultMode = 'light';
  ngOnInit(): void {
    let currentMode = localStorage.getItem('view-mode');
    let root = document.querySelector('html');
    if (!currentMode) currentMode = this.defaultMode;
    root?.classList.add(currentMode);
  }
}
