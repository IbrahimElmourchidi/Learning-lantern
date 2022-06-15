import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './compnents/calendar/calendar.component';
import { ClassContainerComponent } from './compnents/class-container.ts/class-container.component';
import { ClassListComponent } from './compnents/class-list/class-list.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(classRoutes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}
