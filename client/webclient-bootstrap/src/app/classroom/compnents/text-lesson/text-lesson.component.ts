import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import tinymce from 'tinymce';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';
import { LessonInList } from '../text-lesson-container/text-lesson-container.component';
export interface lessonList {
  id: string;
  htmlValue: string;
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
  title: string = '';
  constructor(
    private appStateService: StateService,
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    document.getElementById('mustRemove')?.remove();
  }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || '';
    //  this.get_editor_content();
    this.appStateService.currentState.subscribe((data) => {
      this.appState = data;
      if (this.appState.newVideoId) {
        this.addVideo(this.appState.newVideoId);
      }
      if (this.appState.videoToDelete) {
        console.log(this.appState.videoToDelete);
        this.deleteVideoFrame(data.videoToDelete || '');
      }
      if (this.appState.editorClosed) {
        console.log('lets save lesson');
        this.getLessonContent(data);
      }
      if (this.appState.lessonChange) {
        setTimeout(() => {
          this.SetlessonContent();
        }, 1000);
      }
    });
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

  SetlessonContent() {
    let class_route = this.router.url.split('/');
    console.log(class_route);
    let lesson = class_route[class_route.length - 1];
    console.log(lesson);
    this.http.doGet(env.classRoot + `/${lesson}`, {}).subscribe(
      (res) => {
        console.log(res);
        const result = res as LessonInList;
        this.lessonHTML = result.HtmlBody;
      },
      (err) => {
        console.log(err.error);
      }
    );
    this.appStateService.changeState({
      lessonChange: false,
    });
  }

  getLessonContent(data: AppState) {
    let body = {
      Id: this.lessonId,
      HtmlBody: this.lessonHTML,
    };
    this.appStateService.changeState({
      editorClosed: false,
    });
    return this.http.doPut(env.classRoot, body, {}).subscribe(
      (res) => {
        console.log(res);
        const result = res as string;
      },
      (err) => {
        console.log(err.error);
      }
    );
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
  deleteVideo() {
    return this.http.doDelete('', {}).subscribe(
      (res) => {
        const result = res as string;
        this.videoToInsert = result;
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
