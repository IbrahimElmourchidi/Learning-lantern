import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import tinymce from 'tinymce';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';

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
export class TextLessonComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor!: ElementRef;

  appState!: AppState;
  videoToInsert: string = '';
  htmlValue: any;
  lessonId: any;
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
      if (this.appState.newVideoId) {
        this.addVideo(this.appState.newVideoId);
      }
      if (this.appState.videoToDelete) {
        console.log(this.appState.videoToDelete);
        this.deleteVideoFrame(data.videoToDelete || '');
      }
    });
  }
  ngAfterViewInit(): void {
    document.getElementById('mustRemove')?.remove();
  }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || '';
    this.appStateService.changeState({
      activeLesson: this.lessonId,
    });
    //  this.get_editor_content();
  }
  editorHidden = true;
  lessonHTML = `    
  <h1  id='mustRemove' style="text-align: center;"><strong>hello world</strong></h1>
<p><strong>Chapter1: hello world</strong></p>
<p><em>Hello world is our first Lesson</em></p>
<p>&nbsp;</p>
<h1 style="text-align: left;"><strong>&nbsp;</strong></h1>
  
  `;
  tinymceConfig = {
    menubar: 'edit view  format tools table help',
    plugins: [
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'searchreplace',
      'visualblocks',
      'table',
      'wordcount',
    ],
    height: '100%',
    toolbar:
      'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
      'forecolor backcolor emoticons | help',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    base_url: '/tinymce',
    suffix: '.min',
  };

  get_editor_content() {
    console.log(this.htmlValue);
  }

  myEditor: any;

  getLessonContent(data: AppState) {
    let body = {
      htmlValue: String,
      title: String,
      classroomId: String,
    };
    return this.http.doPost(``, body, {}).subscribe((res) => {
      let result = res as {
        id: string;
        resHtml: string;
        title: string;
        classroomId: string;
      };
      console.log(res);
    });
  }

  addVideo(id: string) {
    console.log('lets add new video ', id);
    const editor = tinymce.get('editor');
    editor.insertContent(
      // TODO: change the 123 to the video id

      ` <div id="123">
      <iframe style="width:90%; height:380px; border:none"  src="/video/${id}" title="W3Schools Free Online Web Tutorials"></iframe>
      </div> `
    );
    this.appStateService.changeState({
      newVideoId: '',
    });
  }

  deleteVideoFrame(id: string) {
    document.querySelector(`#${id}`)?.remove();
    this.appStateService.changeState({
      videoToDelete: '',
    });
  }
}
