import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassContainerComponent } from './component/class-container/class-container.component';
import { ClassListComponent } from './component/class-list.component/class-list.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [ClassContainerComponent, ClassListComponent],
  imports: [CommonModule, ClassroomRoutingModule],
  providers: [ChatService],
  exports: [],
})
export class ClassroomModule {}
