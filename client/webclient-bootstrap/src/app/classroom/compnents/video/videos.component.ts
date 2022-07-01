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
  playing = false;
  interval: any;
  @Input() quizList!: QuizArray[];
  @Input() source: string = 'hello';
  @ViewChild('target', { static: true }) target!: ElementRef;
  currentIndex = 0;

  constructor() {}

  ngAfterViewInit(): void {
    this.quizList = this.quizList.sort((a, b) => {
      return a.time - b.time;
    });
    this.createVideoObject();
  }

  goCheckAll() {
    if (
      Math.floor(this.player.currentTime()) ===
      this.quizList[this.currentIndex]?.time
    ) {
      this.player.pause();
      console.log(this.quizList[this.currentIndex].quizId);
      this.currentIndex++;
    }
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (this.playing) {
        console.log('interval working');
        this.goCheckAll();
      }
    }, 500);
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

    this.player.on(this.target.nativeElement, 'play', () => {
      this.playing = true;
    });

    this.player.on(this.target.nativeElement, 'pause', () => {
      this.playing = false;
    });

    this.player.on(this.target.nativeElement, 'seeked', () => {
      this.computeCurrentIndex();
    });

    this.startInterval();
  }

  computeCurrentIndex() {
    const index = this.quizList.findIndex((object) => {
      return object.time > Math.floor(this.player.currentTime());
    });
    this.currentIndex = index == -1 ? this.quizList.length : index;
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    clearInterval(this.interval);
  }
}