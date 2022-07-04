import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { MessagePaginateI } from 'src/app/shared/interfaces/message.interface';
import { RoomI } from 'src/app/shared/interfaces/room.interface';
import { HttpService } from 'src/app/shared/services/http.service';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { ChatService } from '../../services/chat.service';
import { environment as env } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface FileResponseI {
  filePath: string;
  type: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  chatRoom!: RoomI;
  sending = false;
  userId!: string;
  File!: any;
  fileField: FormControl = new FormControl(null, [Validators.required]);
  messages$!: Observable<MessagePaginateI>;
  appState!: AppState;
  userMessage: FormControl = new FormControl(null);
  sendMessageForm: FormGroup = new FormGroup({
    userMessage: this.userMessage,
    fileField: this.fileField,
  });

  constructor(
    private chatService: ChatService,
    private appStateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private jwt: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.userId =
      localStorage.getItem('userId') ||
      this.jwt.decodeToken(this.jwt.tokenGetter()).sub;
    this.appStateService.currentState.subscribe((data) => {
      this.initiateRoom(data);
    });
    this.messages$ = combineLatest([
      this.chatService.getMessages(),
      this.chatService.getNewMessage().pipe(startWith(null)),
    ]).pipe(
      map(([messagePaginate, message]) => {
        if (message && message.room.Id === this.chatRoom.Id)
          messagePaginate.items.push(message);
        const items = messagePaginate.items.sort((a, b): number => {
          if (a.created_at && b.created_at)
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          return 0;
        });
        messagePaginate.items = items;

        return messagePaginate;
      }),
      tap(() => this.scrollToBottom())
    );
  }

  sendMessage() {
    this.sending = true;
    Object.keys(this.sendMessageForm.controls).forEach((key) => {
      this.sendMessageForm.controls[key].markAsDirty();
      this.sendMessageForm.controls[key].markAsTouched();
    });
    if (this.File) {
      let fileMessage = this.userMessage.value || '';
      const formData = new FormData();
      formData.append('file', this.File);
      this.closeModalBtn.nativeElement.click();
      this.http.doPost(env.chatRoot + `/upload`, formData, {}).subscribe(
        (res) => {
          const result = res as FileResponseI;
          console.log(result);
          this.chatService.sendMessage({
            room: this.chatRoom,
            text: fileMessage,
            file: result.filePath,
            fileType: result.type,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.userMessage.value) {
      this.chatService.sendMessage({
        room: this.chatRoom,
        text: this.userMessage.value,
      });
    }
    this.File = null;
    this.userMessage.reset();
  }

  initiateRoom(data: AppState) {
    if (!data.activeRoom) {
      this.router.navigate(['/class/list']);
    } else {
      this.chatRoom = data.activeRoom;
    }
  }

  ngAfterViewInit(): void {
    this.chatService.getRoomMessages(this.chatRoom);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(
      () =>
        (this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight),
      1
    );
  }

  ngOnDestroy(): void {}

  closeImageAddModal() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.File = file;
    console.log('file was set');
  }
}
