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

export interface lessonList {
  id: string;
  htmlValue: string;
  title: string;
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
  lessonHTML = ``;
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

SetlessonContent(){
  return this.http.doGet(``,{}).subscribe(
    (res) =>{
      console.log(res);
      const result=res as string;
      this.lessonHTML=result;
  },
  (err) =>{
    console.log(err.error);
    
  });
}
  myEditor: any;

  getLessonContent(data: AppState) {
    let body = {
      htmlValue: String,
    };
    return this.http.doPost(``, body, {}).subscribe((res) => {
      let result = res as {
        id: string;
        resHtml: string;
        title: string;
      };
      console.log(res);
    });
  }



  addVideo(id: string) {
    console.log('lets add new video ', id);
    const editor = tinymce.get('editor');
    editor.insertContent(
      // TODO: change the 123 to the video id

      ` <div id="${id}">
      <iframe style="width:90%; height:380px; border:none"  src="/video/${id}" title="W3Schools Free Online Web Tutorials"></iframe>
      </div> `
    );
    this.appStateService.changeState({
      newVideoId: '',
    });
  }
deleteVideo(){
  return this.http.doDelete(``,{}).subscribe(
    (res) => {
      const result = res as string;
      this.videoToInsert=result;
    },
    (err) => {
      this.deleteVideoFrame('12345');
    }
  );
}
  deleteVideoFrame(id: string) {
    document.querySelector(`#${id}`)?.remove();
    this.appStateService.changeState({
      videoToDelete: '',
    });
  }
}
