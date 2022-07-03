import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import {lessonList} from '../text-lesson/text-lesson.component'

@Component({
  selector: 'app-lesson-container',
  templateUrl: 'text-lesson-container.component.html',
  styleUrls: ['text-lesson-container.component.scss'],
})
export class TextLessonContainerComponent implements OnInit {
  // @Input() lessonList!: lessonList;
  uploadedVideoId = '';
  editorHidden = true;
  buttonText = 'Edit';
  fileName = '';
  lessonList = [
    { id: 1, title: 'hello1' },
    { id: 2, title: 'hello2' },
  ];

  uploadFrom!: FormGroup;
  File!: FormControl;

  quizList = new FormGroup({
    quizTime: new FormControl(),
    quizeId: new FormControl(),
  });

  constructor(
    private appStateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpService
  ) {
    this.File = new FormControl();
    this.uploadFrom = new FormGroup({
      File: this.File,
      quizList: this.quizList,
    });
  }

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

  // getLessonContent(data: AppState) {
  //   let body = {
  //   htmlValue: String,
  //   title: String,
  //   classroomId: String,
  // };
  // return this.http.doPost(``, body, {}).subscribe((res) => {
  //   let result = res as {
  //     id: number;
  //     resHtml: string;
  //     title: string;
  //     classroomId: string;
  //   };
  //   console.log(res);
  // });
  // }

  onSubmit() {
    console.log(this.File.value);
    const file = this.File.value;
    const QuizList = this.quizList.value;
    const formData = new FormData();
    formData.append('File', file);
    formData.append('quizList', QuizList);

    if (this.uploadFrom.valid) {
      this.http.doPost('url', formData, {}).subscribe(
        (res) => {
          console.log(res);
          const result = res as string;
          this.uploadedVideoId = result;
          this.sendVideoId(result);
        },
        (err) => {}
      );
    }
  }

  sendVideoId(id: string) {
    this.appStateService.changeState({
      newVideoId: id,
    });
  }
}
