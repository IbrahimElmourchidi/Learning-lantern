import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OpenVidu, Session } from 'openvidu-browser';
import { environment as env } from 'src/environments/environment';
export interface pariticpantsI {
  id: string;
}
@Component({
  selector: 'app-inside-meeting',
  templateUrl: 'inside-meeting.component.html',
  styleUrls: ['inside-meeting.component.scss'],
})
export class InsideMeetingComponent implements OnInit {
  userName: string;
  roomId!: string;
  meetingId!: string;
  OV!: OpenVidu;
  session!: any;
  events: string = '';
  joinBtnText = 'join';
  joinBtnDisabled = false;
  numVideos = 0;
  sessionName!: any;
  token!: any;
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
    window.onbeforeunload = () => {
      // Gracefully leave session
      if (this.session) {
        this.removeUser();
        this.leaveSession();
      }
    };
  }

  joinSession() {
    this.joinBtnText = 'joining';
    this.joinBtnDisabled = true;
    this.getToken();
  }

  async getToken() {
    this.sessionName = this.meetingId;
    this.OV = new OpenVidu();
    this.session = this.OV.initSession();
    this.session.on('connectionCreated', (event: any) => {
      this.pushEvent(event);
    });
    this.session.on('connectionDestroyed', (event: any) => {
      this.pushEvent(event);
    });
    this.session.on('streamCreated', (event: any) => {
      this.pushEvent(event);
      //Subscribe to the Stream to receive it
      // HTML video will be appended to element with 'video-container' id
      const subscriber = this.session.subscribe(
        event.stream,
        'video-container'
      );
      subscriber.on('videoElementCreated', (event: any) => {
        this.pushEvent(event);
        this.updateNumVideos(1);
      });
      subscriber.on('videoElementDestroyed', (event: any) => {
        this.pushEvent(event);
        this.updateNumVideos(-1);
      });
      subscriber.on('streamPlaying', (event: any) => {
        this.pushEvent(event);
      });
    });
    this.session.on('streamDestroyed', (event: any) => {
      this.pushEvent(event);
    });
    this.session.on('sessionDisconnected', (event: any) => {
      this.pushEvent(event);
      if (event.reason !== 'disconnect') {
        this.removeUser();
      }
      if (event.reason !== 'sessionClosedByServer') {
        this.session = null;
        this.numVideos = 0;
      }
    });

    this.session.on('recordingStarted', (event: any) => {
      this.pushEvent(event);
    });

    this.session.on('recordingStopped', (event: any) => {
      this.pushEvent(event);
    });

    this.session.on('exception', (exception: any) => {
      console.warn(exception);
    });

    try {
      this.session.connect(this.token);
      // hide - show
      const publisher = this.OV.initPublisher('video-container', {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      publisher.on('accessAllowed', (event: any) => {
        this.pushEvent({
          type: 'accessAllowed',
        });
      });

      publisher.on('accessDenied', (event: any) => {
        this.pushEvent(event);
      });

      publisher.on('accessDialogOpened', (event: any) => {
        this.pushEvent({
          type: 'accessDialogOpened',
        });
      });

      publisher.on('accessDialogClosed', (event: any) => {
        this.pushEvent({
          type: 'accessDialogClosed',
        });
      });

      publisher.on('streamCreated', (event: any) => {
        this.pushEvent(event);
      });

      publisher.on('videoElementCreated', (event: any) => {
        this.pushEvent(event);
        this.updateNumVideos(1);
        // muted ture <==
      });

      publisher.on('videoElementDestroyed', (event: any) => {
        this.pushEvent(event);
        this.updateNumVideos(-1);
      });

      publisher.on('streamPlaying', (event: any) => {
        this.pushEvent(event);
      });
      this.session.publish(publisher);
    } catch (error: any) {
      console.warn(
        'There was an error connecting to the session:',
        error.event.code,
        error.message
      );
      // <= enable btn
    }
    return false;
  }

  leaveSession() {
    this.session.disconnect();
    //  <= enable btn
  }

  updateNumVideos(i: number) {
    this.numVideos += i;
    document.querySelector('video')!.className = '';
    switch (this.numVideos) {
      case 1:
        document.querySelector('video')?.classList.add('two');
        break;
      case 2:
        document.querySelector('video')?.classList.add('two');
        break;
      case 3:
        document.querySelector('video')?.classList.add('three');
        break;
      case 4:
        document.querySelector('video')?.classList.add('four');
    }
  }

  pushEvent(event: any) {
    this.events += (!this.events ? '' : '\n') + event.type;
    console.log(event.type);
  }

  clearHttpTextArea() {}

  clearEventsTextarea() {
    this.events = '';
  }

  removeUser() {
    this.httpRequest(
      'POST',
      env.rtcRoot + 'remove-user',
      {
        sessionName: this.sessionName,
        token: this.token,
      },
      "User couldn't be removed from session",
      (res: any) => {
        console.warn('You have been removed from session ' + this.sessionName);
      }
    );
  }

  closeSession() {
    this.httpRequest(
      'DELETE',
      env.rtcRoot + 'close-session',
      {
        sessionName: this.sessionName,
      },
      "Session couldn't be closed",
      (res: any) => {
        console.warn('Session ' + this.sessionName + ' has been closed');
      }
    );
  }

  fetchAll() {
    this.httpRequest(
      'GET',
      env.rtcRoot + 'fetch-all',
      {},
      "All session info couldn't be fetched",
      (res: any) => {
        console.warn('All session info has been fetched');
      }
    );
  }

  forceDisconnect() {
    this.httpRequest(
      'DELETE',
      env.rtcRoot + 'force-disconnect',
      {
        sessionName: this.sessionName,
        connectionId: document.getElementById('forceValue') || '',
      },
      "Connection couldn't be closed",
      (res: any) => {
        console.warn('Connection has been closed');
      }
    );
  }

  forceUnpublish() {
    this.httpRequest(
      'DELETE',
      env.rtcRoot + 'force-unpublish',
      {
        sessionName: this.sessionName,
        streamId: document.getElementById('forceValue'),
      },
      "Stream couldn't be closed",
      (res: any) => {
        console.warn('Stream has been closed');
      }
    );
  }

  stopRecording() {
    var forceRecordingId = document.getElementById('forceRecordingId');
    this.httpRequest(
      'POST',
      env.rtcRoot + 'recording/stop',
      {
        recording: forceRecordingId,
      },
      'Stop recording WRONG',
      (res: any) => {
        console.log(res);
      }
    );
  }

  deleteRecording() {
    var forceRecordingId = document.getElementById('forceRecordingId');
    this.httpRequest(
      'DELETE',
      env.rtcRoot + 'recording/delete',
      {
        recording: forceRecordingId,
      },
      'Delete recording WRONG',
      (res: any) => {
        console.log('DELETE ok');
      }
    );
  }

  startRecording() {
    // var outputMode = $('input[name=outputMode]:checked').val();
    // var hasAudio = $('#has-audio-checkbox').prop('checked');
    // var hasVideo = $('#has-video-checkbox').prop('checked');
    this.httpRequest(
      'POST',
      env.rtcRoot + 'recording/start',
      {
        session: this.session.sessionId,
        outputMode: 'compose',
        hasAudio: true,
        hasVideo: true,
      },
      'Start recording WRONG',
      (res: any) => {
        console.log(res);
      }
    );
  }

  getRecording() {
    var forceRecordingId = document.getElementById('forceRecordingId');
    this.httpRequest(
      'GET',
      env.rtcRoot + 'recording/get/' + forceRecordingId,
      {},
      'Get recording WRONG',
      (res: any) => {
        console.log(res);
      }
    );
  }

  listRecordings() {
    this.httpRequest(
      'GET',
      env.rtcRoot + 'recording/list',
      {},
      'List recordings WRONG',
      (res: any) => {
        console.log(res);
      }
    );
  }

  httpRequest(method: any, url: any, body: any, errorMsg: any, callback: any) {
    this.events = '';
    var http = new XMLHttpRequest();
    http.open(method, url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.addEventListener('readystatechange', processRequest, false);
    http.send(JSON.stringify(body));

    function processRequest() {
      if (http.readyState == 4) {
        if (http.status == 200) {
          try {
            callback(JSON.parse(http.responseText));
          } catch (e) {
            callback(e);
          }
        } else {
          console.warn(errorMsg + ' (' + http.status + ')');
          console.warn(http.responseText);
        }
      }
    }
  }

  fetchInfo() {
    this.httpRequest(
      'POST',
      env.rtcRoot + '/fetch-info',
      {
        sessionName: this.sessionName,
      },
      "Session couldn't be fetched",
      (res: any) => {
        console.warn('Session info has been fetched');
        this.events = JSON.stringify(res, null, '\t');
      }
    );
  }
}
