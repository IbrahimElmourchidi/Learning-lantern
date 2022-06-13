import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassContainerComponent } from './component/class-container/class-container.component';
import { ClassListComponent } from './component/class-list.component/class-list.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [ClassContainerComponent, ClassListComponent],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ChatService],
  exports: [],
})
export class ClassroomModule {}
