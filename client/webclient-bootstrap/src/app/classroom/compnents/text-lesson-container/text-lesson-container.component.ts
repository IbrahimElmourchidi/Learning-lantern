import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-lesson-container',
  templateUrl: 'text-lesson-container.component.html',
  styleUrls: ['text-lesson-container.component.scss'],
})
export class TextLessonContainerComponent implements OnInit {
  editorHidden = true;
  buttonText = 'Edit';
  lessonList = [
    { id: 1, title: 'hello1' },
    { id: 2, title: 'hello2' },
  ];

  constructor(
    private appStateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.router.navigate([this.lessonList[0].id], {
      relativeTo: this.activatedRoute,
    });
  }
  toggle() {
    if (this.editorHidden) {
      this.buttonText = 'Save';
      this.appStateService.changeState({
        editorOn: true,
      });
    } else {
      this.buttonText = 'Edit';
      this.appStateService.changeState({
        editorOn: false,
      });
    }
    this.editorHidden = !this.editorHidden;
  }

  changeLesson(id: any) {
    this.appStateService.changeState({
      activeLesson: id,
    });
  }
}
