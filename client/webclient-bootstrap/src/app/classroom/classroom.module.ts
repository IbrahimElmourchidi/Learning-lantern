import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { CalendarComponent } from './compnents/calendar/calendar.component';
import { ChatComponent } from './compnents/chat/chat.component';
import { ClassContainerComponent } from './compnents/class-container.ts/class-container.component';
import { ClassHeaderComponent } from './compnents/class-header/class-header.component';
import { ClassInsideComponent } from './compnents/class-inside/class-inside.component';
import { ClassListComponent } from './compnents/class-list/class-list.component';
import { InsideMeetingComponent } from './compnents/inside-meeting/inside-meeting.component';
import { JionMeetingComponent } from './compnents/join-meeting/join-meeting.component';
import { UserStatisticsComponent } from './compnents/statistics/user-statistics.component';
import { TextLessonComponent } from './compnents/text-lesson/text-lesson.component';
import { TodoComponent } from './compnents/todo/todo.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { TextLessonContainerComponent } from './compnents/text-lesson-container/text-lesson-container.component';

import { OVService } from './services/ov.service';
import { VideoComponent } from './compnents/video/videos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';

@NgModule({
  declarations: [
    ClassContainerComponent,
    ClassHeaderComponent,
    ClassListComponent,
    TodoComponent,
    ClassInsideComponent,
    ChatComponent,
    TextLessonComponent,
    JionMeetingComponent,
    UserStatisticsComponent,
    InsideMeetingComponent,
    SafeHtmlPipe,
    TruncatePipe,
    TextLessonContainerComponent,
    VideoComponent,
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    NgbModule,
  ],
  exports: [],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    OVService,
  ],
})
export class ClassroomModule {}
