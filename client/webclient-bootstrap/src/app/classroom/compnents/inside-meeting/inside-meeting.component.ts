import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface pariticpantsI {
  id: string;
}
@Component({
  selector: 'app-inside-meeting',
  templateUrl: 'inside-meeting.component.html',
  styleUrls: ['inside-meeting.component.scss'],
})
export class InsideMeetingComponent implements OnInit {
  @ViewChild('local') localVideo!: ElementRef;
  userName: string;
  roomId!: string;
  meetingId!: string;
  constructor(
    private jwtService: JwtHelperService,
    private route: ActivatedRoute
  ) {
    if (this.jwtService.decodeToken(this.jwtService.tokenGetter())) {
      this.userName = this.jwtService.decodeToken(
        this.jwtService.tokenGetter()
      );
    } else this.userName = 'guest';
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '';
    this.meetingId = this.route.snapshot.paramMap.get('meetingId') || '';
  }
}
