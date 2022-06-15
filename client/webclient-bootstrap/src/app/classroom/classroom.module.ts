import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { CalendarComponent } from './compnents/calendar/calendar.component';
import { ClassContainerComponent } from './compnents/class-container.ts/class-container.component';
import { ClassHeaderComponent } from './compnents/class-header/class-header.component';
import { ClassListComponent } from './compnents/class-list/class-list.component';
import { TodoComponent } from './compnents/todo/todo.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    ClassContainerComponent,
    ClassHeaderComponent,
    ClassListComponent,
    CalendarComponent,
    TodoComponent,
  ],
  imports: [CommonModule, ClassroomRoutingModule],
  exports: [],
  providers: [ChatService],
})
export class ClassroomModule {}
