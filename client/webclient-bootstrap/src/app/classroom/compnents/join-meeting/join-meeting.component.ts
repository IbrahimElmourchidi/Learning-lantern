import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-join-meeting',
  templateUrl: 'join-meeting.component.html',
  styleUrls: ['join-meeting.component.scss'],
})
export class JionMeetingComponent implements OnInit {
  meetingId!: string;

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {}
  joinMeeting() {
    console.log(this.meetingId);
  }
}
