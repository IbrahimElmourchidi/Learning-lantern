import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import videojs from 'video.js';
import eventjs from 'video.js';
export interface videoOptions {
  fluid: boolean;
  aspectRatio: string;
  autoplay: boolean;
  sources: {
    src: string;
    type: string;
  }[];
}
export interface QuizArray {
  quizId: string;
  time: number;
}
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnDestroy, AfterViewInit {
  player!: videojs.Player;
  currentIndex = 0;
  interval: any;
  @Input() quizList!: QuizArray[];
  @Input() source: string = 'hello';

  @ViewChild('target', { static: true })
  target!: ElementRef;
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.createVideoObject();
    // this.interval = setInterval(() => {
    //   this.goCheckAll();
    // }, 1000);
    this.player_pause();
  }

  checkTime(time: number, id: string) {
    if (Math.floor(this.player.currentTime()) == time) {
      this.player.pause();
      this.quizList = this.quizList.filter((el) => el.quizId !== id);
      this.currentIndex++;
      alert(`quiz ${id}`);
    }
  }

  goCheckAll() {
    for (let i of this.quizList) {
      this.checkTime(i.time, i.quizId);
    }
    if (this.currentIndex === this.quizList.length)
      clearInterval(this.interval);
  }
  player_pause() {
    this.interval = setInterval(() => {
      this.goCheckAll();
    }, 1000);
  }
  createVideoObject() {
    let options: videoOptions = {
      fluid: true,
      autoplay: false,
      aspectRatio: '19:6',
      sources: [
        {
          src: this.source,
          type: 'video/mp4',
        },
      ],
    };
    this.player = videojs(this.target.nativeElement, options, () => {});
    eventjs.on(this.target.nativeElement, 'start', () => {
      console.log('video started');
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
