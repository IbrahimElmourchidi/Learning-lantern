import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceHolderDirective } from '../shared/directeives/placeholder.directive';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { CalendarComponent } from './compnents/calendar/calendar.component';
import { ChatComponent } from './compnents/chat/chat.component';
import { ClassContainerComponent } from './compnents/class-container.ts/class-container.component';
import { ClassHeaderComponent } from './compnents/class-header/class-header.component';
import { ClassInsideComponent } from './compnents/class-inside/class-inside.component';
import { ClassListComponent } from './compnents/class-list/class-list.component';
import { JionMeetingComponent } from './compnents/join-meeting/join-meeting.component';
import { UserStatisticsComponent } from './compnents/statistics/user-statistics.component';
import { TextLessonComponent } from './compnents/text-lesson/text-lesson.component';
import { TodoComponent } from './compnents/todo/todo.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    ClassContainerComponent,
    ClassHeaderComponent,
    ClassListComponent,
    CalendarComponent,
    TodoComponent,
    ClassInsideComponent,
    ChatComponent,
    TextLessonComponent,
    JionMeetingComponent,
    UserStatisticsComponent,
  ],
  imports: [CommonModule, ClassroomRoutingModule, ReactiveFormsModule],
  exports: [],
  providers: [ChatService],
})
export class ClassroomModule {}
