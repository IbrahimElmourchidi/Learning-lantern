import { Component, OnInit } from '@angular/core';
import { RoomI, RoomPaginate } from 'src/app/shared/interfaces/room.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-class-container',
  templateUrl: 'class-container.component.html',
  styleUrls: ['class-container.component.scss'],
})
export class ClassContainerComponent implements OnInit {
  rooms!: RoomPaginate;
  roomName = '';
  selectedRoom!: RoomI;
  constructor(private chatService: ChatService) {
    console.log('class container');
  }
  ngOnInit(): void {
    this.chatService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }
  createNewRoom() {
    this.chatService.createRoom(this.roomName);
    this.roomName = '';
  }

  showSelectedRoom(id: number) {
    this.selectedRoom = this.rooms.items[id];
  }
}
