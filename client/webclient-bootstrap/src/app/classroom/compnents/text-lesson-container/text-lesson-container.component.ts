import { lessonList } from './../text-lesson/text-lesson.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

export interface LessonInList {
  Id: string;
  Title: string;
  HtmlBody: string;
}

@Component({
  selector: 'app-lesson-container',
  templateUrl: 'text-lesson-container.component.html',
  styleUrls: ['text-lesson-container.component.scss'],
})
export class TextLessonContainerComponent implements OnInit {
  @ViewChild('closeLessonModlaBtn') closeLessonModlaBtn!: ElementRef;
  uploadedVideoId = '';
  editorHidden = true;
  buttonText = 'Edit';
  fileName = '';

  lessonList: LessonInList[] = [];

  uploadFrom!: FormGroup;
  File!: any;
  quizList = new FormArray([]);

  lessonFrom!: FormGroup;
  title!: FormControl;
  classId!: string;
  addNewQuizField() {
    this.quizList.push(
      new FormGroup({
        quizId: new FormControl(''),
        time: new FormControl(''),
      })
    );
  }
  errorMsg = '';
  constructor(
    private appStateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService
  ) {
    this.File = new FormControl();
    this.uploadFrom = new FormGroup({
      File: this.File,
      quizList: this.quizList,
    });
    this.title = new FormControl();
    this.lessonFrom = new FormGroup({ title: this.title });
    this.route.parent?.params.subscribe((params) => {
      this.classId = params['classId'];
    });
  }

  ngOnInit() {
    // this.onSubmitlesson();
    // this.router.navigate([this.lessonList[0].id], {
    //   relativeTo: this.activatedRoute,
    // });

    this.http
      .doGet(env.classRoot + '/Classroom/' + `${this.classId}`, {})
      .subscribe(
        (res) => {
          console.log('starting', res);
          const result = res as LessonInList[];
          this.lessonList = result;
          if (result.length) {
            this.router.navigate([result[0].Id], {
              relativeTo: this.route,
            });
            this.appStateService.changeState({
              lessonChange: true,
            });
          }
        },
        (err) => {
          console.log(err);
          this.errorMsg = err.message;
        }
      );
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
        editorClosed: true,
      });
    }
    this.editorHidden = !this.editorHidden;
  }

  //Video Post
  onSubmit() {
    console.log(this.File.value);
    const QuizList = this.quizList.value;
    const formData = new FormData();
    formData.append('File', this.File);
    formData.append('QuizList', QuizList);
    if (this.uploadFrom.valid) {
      this.http
        .doPost(
          'https://learning-lantern.azurewebsites.net/api/v1/Video',
          formData,
          {}
        )
        .subscribe(
          (res) => {
            console.log(res);
            const result = res as string;
            this.uploadedVideoId = result;
            this.sendVideoId(result);
          },
          (err) => {
            this.sendVideoId('321');
          }
        );
    }
  }
  sendVideoId(id: string) {
    this.appStateService.changeState({
      newVideoId: id,
    });
  }

  // Lesson Post
  onSubmitlesson() {
    console.log(this.title.value);
    const title = this.title.value;
    const classId = this.classId;
    if (this.lessonFrom.valid) {
      this.closeLessonModlaBtn.nativeElement.click();
      let body = {
        Title: title,
        ClassroomId: classId,
      };
      this.http.doPost(env.classRoot, body, {}).subscribe(
        (res) => {
          console.log(res);
          const result = res as LessonInList;
          this.lessonList.push(result);
        },
        (err) => {
          this.changeLesson('12');
        }
      );
    }
  }
  changeLesson(id: string) {
    this.appStateService.changeState({
      lessonChange: true,
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.File = file;
    console.log('file was set');
  }
}
