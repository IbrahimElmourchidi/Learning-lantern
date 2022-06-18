import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { MessagePaginateI } from 'src/app/shared/interfaces/message.interface';
import { RoomI } from 'src/app/shared/interfaces/room.interface';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  chatRoom!: RoomI;
  messages$!: Observable<MessagePaginateI>;
  appState!: AppState;
  userMessage: FormControl = new FormControl(null, [Validators.required]);
  sendMessageFrom: FormGroup = new FormGroup({
    userMessage: this.userMessage,
  });
  constructor(
    private chatService: ChatService,
    private appStateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.chatService.sendMessage({
      room: this.chatRoom,
      text: this.userMessage.value,
    });
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

  ngOnDestroy(): void {
    this.appStateService.changeState({ activeRoom: undefined });
  }
}
