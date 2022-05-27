import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassListComponent } from './components/class-list/class-list.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

const classroomRoutes: Routes = [
  {
    path: '',
    component: ClassListComponent,
    children: [{ path: 'mycourses', component: MyCoursesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(classroomRoutes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}
