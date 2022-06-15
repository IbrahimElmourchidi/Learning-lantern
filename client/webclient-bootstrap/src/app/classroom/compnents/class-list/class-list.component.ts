import { Component, OnDestroy, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { RoomI, RoomPaginate } from 'src/app/shared/interfaces/room.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-class-list',
  templateUrl: 'class-list.component.html',
  styleUrls: ['class-list.component.scss'],
})
export class ClassListComponent implements OnDestroy {
  classList!: RoomPaginate;
  shouldDestroy = this.chatService
    .getRooms()
    .subscribe((data) => (this.classList = data));
  constructor(private chatService: ChatService) {}

  ngOnDestroy(): void {
    this.shouldDestroy.unsubscribe();
  }
}
