import { Component, OnInit } from '@angular/core';
import { RoomPaginate } from 'src/app/shared/interfaces/room.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-class-container',
  templateUrl: 'class-container.component.html',
  styleUrls: ['class-container.component.scss'],
})
export class ClassContainerComponent implements OnInit {
  rooms = this.chatService.getRooms();
  roomName: string = '';
  constructor(private chatService: ChatService) {
    console.log('class container');
  }
  ngOnInit(): void {}
  createNewRoom() {
    this.chatService.createRoom(this.roomName);
    this.roomName = '';
  }
}
