import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
// import {lessonList} from '../text-lesson/text-lesson.component'

@Component({
  selector: 'app-lesson-container',
  templateUrl: 'text-lesson-container.component.html',
  styleUrls: ['text-lesson-container.component.scss'],
})
export class TextLessonContainerComponent implements OnInit {
  // @Input() lessonList!: lessonList;
  editorHidden = true;
  buttonText = 'Edit';
  fileName = '';
  lessonList = [
    { id: 1, title: 'hello1' },
    { id: 2, title: 'hello2' },
  ];
  

  constructor(
    private appStateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private https: HttpClient
  ) {}
  // start upload file 
  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.https.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}
//end uplod file
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
}
