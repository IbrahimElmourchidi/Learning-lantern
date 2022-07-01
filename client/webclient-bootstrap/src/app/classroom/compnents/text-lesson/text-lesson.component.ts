import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import tinymce from 'tinymce';
@Component({
  selector: 'app-textlesson',
  templateUrl: 'text-lesson.component.html',
  styleUrls: ['text-lesson.component.scss'],
})
export class TextLessonComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  appState!: AppState;
  videoToInsert: string = '';
  constructor(
    private appStateService: StateService,
    private route: ActivatedRoute
  ) {
    this.appStateService.currentState.subscribe((data) => {
      this.appState = data;
      if (this.appState.activeLesson) {
        this.getLessonContent(data);
      }
    });
  }

  ngOnInit(): void {
    this.appStateService.changeState({
      activeLesson: this.route.snapshot.paramMap.get('lessonId') || '',
    });
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

  myEditor: any;

  getLessonContent(data: AppState) {
    console.log(data.activeLesson);
  }

  openModal() {
    // open modal
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
