import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { WebSocketService } from '../shared/services/websocket.service';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassHeaderComponent } from './components/class-header/class-header.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

@NgModule({
  declarations: [ClassListComponent, ClassHeaderComponent, MyCoursesComponent],
  imports: [ClassroomRoutingModule, MaterialModule, CommonModule],
  providers: [WebSocketService],
})
export class ClassroomModule {}
