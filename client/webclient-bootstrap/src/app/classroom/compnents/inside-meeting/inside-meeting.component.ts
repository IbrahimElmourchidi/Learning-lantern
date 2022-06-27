import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { KurentoService } from '../../services/kurento.service';
import * as kurento from 'kurento-client';

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
  remoteVideo = '';
  userName: string;
  roomId!: string;
  meetingId!: string;
  participants: { [id: string]: any } = {};
  constructor(
    private kurentoService: KurentoService,
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
    this.kurentoService.getRtcMessage().pipe(
      map((message: any) => {
        switch (message.event) {
          case 'newParticipantArrived':
            this.recieveVideo(message.userId, message.userName);
            break;
          case 'existingParticipants':
            this.onExistingParticipants(message.userId, message.existingUsers);
            break;
          case 'reciveVideoAnswer':
            this.onReciveVideoAnswer(message.senderId, message.sdpAnswer);
            break;
          case 'candidate':
            this.addIceCandidate(message.userId, message.candidate);
            break;
          default:
            console.log('not known case', message.event);
        }
      })
    );
  }

  letsgo() {
    if (this.roomId === ' ' || this.meetingId === ' ') {
      alert('enter valid ids');
    } else {
      let message = {
        event: 'joinRoom',
        userName: this.userName,
        roomName: this.roomId,
      };
      this.sendMessage(message);
    }
  }

  sendMessage(message: any) {
    this.kurentoService.emit('message', message);
  }

  recieveVideo(userId: string, userName: string) {
    let video = document.createElement('video');
    video.id = userId;
    video.autoplay = true;
    this.remoteVideo += video;
    let user = {
      id: userId,
      username: userName,
      video: video,
      rtcPeer: null,
    };
    this.participants[user.id] = user;
  }

  onExistingParticipants(userId: string, existingUsers: any[]) {}

  onReciveVideoAnswer(senderId: string, sdpAnswer: any) {}

  addIceCandidate(userId: string, candidate: any) {}
}
