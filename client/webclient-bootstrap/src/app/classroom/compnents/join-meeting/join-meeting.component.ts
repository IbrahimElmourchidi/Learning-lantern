import { Component, OnInit } from '@angular/core';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-join-meeting',
  templateUrl: 'join-meeting.component.html',
  styleUrls: ['join-meeting.component.scss'],
})
export class JionMeetingComponent implements OnInit {
  meetingId!: string;
  appState!: AppState;

  constructor(private appStateService: StateService) {}
  ngOnInit(): void {
    this.appStateService.currentState.subscribe(
      (state) => (this.appState = state)
    );
  }
  joinMeeting() {
    if (!this.meetingId || !this.appState.userName) {
      console.log('err');
      return;
    }
    console.log(this.meetingId, this.appState.userName);
  }
}
