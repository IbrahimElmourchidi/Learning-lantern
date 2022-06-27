import { Component, ElementRef, ViewChild } from '@angular/core';
import tinymce from 'tinymce';
@Component({
  selector: 'app-textlesson',
  templateUrl: 'text-lesson.component.html',
  styleUrls: ['text-lesson.component.scss'],
})
export class TextLessonComponent {
  @ViewChild('editor') editor!: ElementRef;

  isHidden = false;
  lessonHTML = '';
  tinymceConfig = {
    menubar: 'favs file edit view insert format tools table help',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    base_url: '/tinymce',
    suffix: '.min',
  };

  myEditor: any;

  toggle() {
    let myEditor = document.querySelector('#editor');
    if (this.isHidden) myEditor?.setAttribute('style', 'display:block');
    else myEditor?.setAttribute('style', 'display:none');
    this.isHidden = !this.isHidden;
  }
}
