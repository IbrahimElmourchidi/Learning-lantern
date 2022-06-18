import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './compnents/calendar/calendar.component';
import { ChatComponent } from './compnents/chat/chat.component';
import { ClassContainerComponent } from './compnents/class-container.ts/class-container.component';
import { ClassInsideComponent } from './compnents/class-inside/class-inside.component';
import { ClassListComponent } from './compnents/class-list/class-list.component';
import { JionMeetingComponent } from './compnents/join-meeting/join-meeting.component';
import { UserStatisticsComponent } from './compnents/statistics/user-statistics.component';
import { TextLessonComponent } from './compnents/text-lesson/text-lesson.component';
import { TodoComponent } from './compnents/todo/todo.component';

const classRoutes: Routes = [
  {
    path: '',
    component: ClassContainerComponent,
    children: [
      {
        path: 'list',
        component: ClassListComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'todo',
        component: TodoComponent,
      },
    ],
  },
  {
    path: ':id',
    component: ClassInsideComponent,
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'lesson',
        component: TextLessonComponent,
      },
      {
        path: 'stat',
        component: UserStatisticsComponent,
      },
      {
        path: 'join',
        component: JionMeetingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(classRoutes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}
