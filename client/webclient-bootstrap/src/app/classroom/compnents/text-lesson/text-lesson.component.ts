import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import tinymce from 'tinymce';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';
// import { ModalService } from '../_modal';
export interface lessonList {
  id: number;
  htmlValue: string;
  title: string;
  classroomId: string;
}
@Component({
  selector: 'app-textlesson',
  templateUrl: 'text-lesson.component.html',
  styleUrls: ['text-lesson.component.scss'],
})
export class TextLessonComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  appState!: AppState;
  videoToInsert: string = '';
  htmlValue: any;
  lessonId:any;
  constructor(
    private appStateService: StateService,
    private route: ActivatedRoute,
    private http: HttpService
  ) {
    this.appStateService.currentState.subscribe((data) => {
      this.appState = data;
      if (this.appState.activeLesson) {
        this.getLessonContent(data);
      }
    });
  }


  ngOnInit(): void {
    this.lessonId=this.route.snapshot.paramMap.get('lessonId') || '';
    this.appStateService.changeState({
      activeLesson:this.lessonId ,
    });
  //  this.get_editor_content();
  }
  editorHidden = true;
  lessonHTML = `    
  <h1 style="text-align: center;"><strong>hello world</strong></h1>
<p><strong>Chapter1: hello world</strong></p>
<p><em>Hello world is our first Lesson</em></p>
<p>&nbsp;</p>
<h1 style="text-align: left;"><strong>&nbsp;</strong></h1>
  
  `;
  tinymceConfig = {
    height: '100%',
    menubar: 'favs',
    toolbar: 'customInsertButton',
    setup: (editor: any) => {
      editor.ui.registry.addButton('customInsertButton', {
        text: 'My Button',
        onAction: () => {
          this.openModal();
        },
      });
    },
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    base_url: '/tinymce',
    suffix: '.min',
  };
  get_editor_content() {

    console.log(this.htmlValue) ;
  }


  myEditor: any;

  getLessonContent(data: AppState) {  
    let body = {
    id:Number,
    htmlValue: String,
    title: String,
    classroomId: String,
  };
  return this.http.doPost(``, body, {}).subscribe((res) => {
    let result = res as {
      id: number;
      resHtml: string;
      title: string;
      classroomId: string;
    };
    console.log(res);
  });
  }
  // params:any;
  // Set_editor_content() {
  //   this.http.doGet(${env.authRoot}/getlesson?Id=${this.lessonId}&token=${encodeURIComponent(this.param.token)}, {params}
  //   ){
  //     let res: lessonList[] = [
  //       {
  //         id: 1,
  //         htmlValue: ``,
  //         title: '',
  //         classroomId: "",
  //       },
  //     ];

  //   }
    
  // }

  openModal() {
    // open modal
    // modalService.open()
    // get the video id
    this.addVideo();
  }

  addVideo() {
    const editor = tinymce.get('editor');
    editor.insertContent(
      ` <iframe style="width:90%; height:380px; border:none" src="/video/${this.videoToInsert}" title="W3Schools Free Online Web Tutorials"></iframe> `
    );
  }
}
