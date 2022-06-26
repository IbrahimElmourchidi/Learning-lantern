import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-join-meeting',
  templateUrl: 'join-meeting.component.html',
  styleUrls: ['join-meeting.component.scss'],
})
export class JionMeetingComponent implements OnInit {
  meetingId!: string;
  appState!: AppState;
  userName = '';
  constructor(
    private appStateService: StateService,
    private jwtService: JwtHelperService
  ) {}
  ngOnInit(): void {
    this.appStateService.currentState.subscribe(
      (state) => (this.appState = state)
    );
    if (!this.jwtService.isTokenExpired()) {
      this.userName = this.jwtService.decodeToken().userId;
    }
  }
  joinMeeting() {
    if (!this.meetingId) {
      console.log('err');
      return;
    }
    console.log(this.meetingId, this.userName);
  }
}
