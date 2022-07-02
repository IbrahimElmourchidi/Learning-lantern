import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import { HttpService } from 'src/app/shared/services/http.service';
// import eventjs from 'video.js';
export interface videoOptions {
  autoplay: boolean;
  sources: {
    src: string;
    type: string;
  }[];
}
export interface QuizArrayI {
  quizId: string;
  time: number;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnDestroy, AfterViewInit, OnInit {
  vidoeId!: string;
  player!: videojs.Player;
  playing = false;
  interval: any;
  source: string = 'https://vjs.zencdn.net/v/oceans.mp4';
  @ViewChild('target', { static: true }) target!: ElementRef;
  currentIndex = 0;
  quizList: QuizArrayI[] = [
    {
      quizId: '2',
      time: 8,
    },
    {
      quizId: '5',
      time: 13,
    },
  ];

  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    this.vidoeId = this.route.snapshot.paramMap.get('videoId') || '';
  }

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
      autoplay: false,
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

  ////http func 
  // getVideo() {  
  //   let body = {
  //     autoplay: Boolean,
  //     sources:[] {
  //       src: String,
  //       type: String,
  //     }[],
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
