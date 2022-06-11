import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassContainerComponent } from './component/class-container/class-container.component';

const classRoutes: Routes = [
  {
    path: '',
    component: ClassContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(classRoutes)],
  exports: [],
})
export class ClassroomRoutingModule {}
