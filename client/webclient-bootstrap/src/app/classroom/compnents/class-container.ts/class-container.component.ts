import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-classroom-container',
  templateUrl: 'class-container.component.html',
  styleUrls: ['class-container.component.scss'],
})
export class ClassContainerComponent {
  constructor(private chatService: ChatService) {}
}
