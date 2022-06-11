import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-class-container',
  templateUrl: 'class-container.component.html',
  styleUrls: ['class-container.component.scss'],
})
export class ClassContainerComponent implements OnInit {
  title = this.chatService.listen('hello');
  constructor(private chatService: ChatService) {
    console.log('class container');
  }
  ngOnInit(): void {}
}
