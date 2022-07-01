import { Component, OnInit } from '@angular/core';

export interface pariticpantsI {
  id: string;
}
@Component({
  selector: 'app-inside-meeting',
  templateUrl: 'inside-meeting.component.html',
  styleUrls: ['inside-meeting.component.scss'],
})
export class InsideMeetingComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
