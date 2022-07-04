import { lessonList } from './../text-lesson/text-lesson.component';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { environment as env } from 'src/environments/environment';


export interface LessonInList {
  id: string;
  title: string;
}

@Component({
  selector: 'app-lesson-container',
  templateUrl: 'text-lesson-container.component.html',
  styleUrls: ['text-lesson-container.component.scss'],
})
export class TextLessonContainerComponent implements OnInit {
  uploadedVideoId = '';
  editorHidden = true;
  buttonText = 'Edit';
  fileName = '';

  lessonList: LessonInList[] = [];

  uploadFrom!: FormGroup;
  File!: FormControl;
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
    this.classId = this.route.snapshot.paramMap.get('classId') || '';
  }

  ngOnInit() {
    // this.onSubmitlesson();
    // this.router.navigate([this.lessonList[0].id], {
    //   relativeTo: this.activatedRoute,
    // });
    this.http.doGet('url' + `/${this.classId}`, {}).subscribe(
      (res) => {
        const result = res as LessonInList[];
        this.lessonList = result;
        if (result.length) {
          this.router.navigate([result[0].id], {
            relativeTo: this.route,
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
      });
    }
    this.editorHidden = !this.editorHidden;
  }

  //Video Post
  onSubmit() {
    console.log(this.File.value);
    const file = this.File.value;
    const QuizList = this.quizList.value;
    const formData = new FormData();
    formData.append('File', file);
    formData.append('QuizList', QuizList);
    console.log(formData.getAll('File'));
    if (this.uploadFrom.valid) {
      this.http.doPost('url', formData, {}).subscribe(
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
    if (this.lessonFrom.valid) {
      this.http.doPost('url', { Title: title }, {}).subscribe(
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
      activeLesson: id,
    });
  }
}
