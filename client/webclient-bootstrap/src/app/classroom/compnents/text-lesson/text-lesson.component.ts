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
  title:string = '';
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
      if(!this.appState.editorOn){
        if(this.firstTime){
          this.firstTime=false;
        }
        else{
          this.getLessonContent(data);
        }
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
  firstTime=true;
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

SetlessonContent(data: AppState){
  return this.http.doGet('learning-lantern.azurewebsites.net/api/v1/TextLesson'+`/${this.lessonId}`,{}).subscribe(
    (res) =>{
      console.log(res);
      const result=res as string;
      this.lessonHTML=result;
  },
  (err) =>{
    console.log(err.error);
    
  });
}

  getLessonContent(data: AppState) {
    if(this.firstTime){
      return
    }
      let body = {
        id:this.lessonId,
        htmlValue: this.lessonHTML
      };
      return this.http.doPost('learning-lantern.azurewebsites.net/api/v1/TextLesson', body, {}).subscribe( (res) => {
        console.log(res);
        const result = res as string;
        this.lessonHTML=result;
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
deleteVideo(){
  return this.http.doDelete('',{}).subscribe(
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
