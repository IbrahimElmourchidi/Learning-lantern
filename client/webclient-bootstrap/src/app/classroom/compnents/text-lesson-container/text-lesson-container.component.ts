import { lessonList } from './../text-lesson/text-lesson.component';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

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

   lessonList: {
    id:string;
    title:string;
  }[]= [];

  uploadFrom!: FormGroup;
  File!: FormControl;
  quizList = new FormArray([]);

  lessonFrom!: FormGroup;
  title!: FormControl;

  addNewQuizField() {
    this.quizList.push(
      new FormGroup({
        quizId: new FormControl(''),
        time: new FormControl(''),
      })
    );
  }

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
    this.title=new FormControl();
    this.lessonFrom=new FormGroup({title:this.title});
  }

  ngOnInit() {
    this.onSubmitlesson();
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

// Function get lesson content
getLessonContent(data: AppState) {
  let body = {
  htmlValue: '',
  title: this.title,
};
return this.http.doPost(``, body, {}).subscribe((res) => {
  let result = res as {
    htmlValue: string;
    title: string;
  };
  console.log(res);
});
}

  //Video Post
  onSubmit() {
    console.log(this.File.value);
    const file = this.File.value;
    const QuizList = this.quizList.value;
    const formData = new FormData();
    formData.append('File', file);
    formData.append('quizList', QuizList);
    if (this.uploadFrom.valid) {
      this.http.doPost('https://learning-lantern.azurewebsites.net/api/v1/Video', formData, {}).subscribe(
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
  onSubmitlesson(){
    console.log(this.title.value);
    const title = this.title.value;
    const formData = new FormData();
    formData.append('title', title);
    if (this.lessonFrom.valid) {
      this.http.doPost('url', formData, {}).subscribe(
        (res) => {
          console.log(res);
          const result = res as {
            id:string,
            title:string
          };
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
