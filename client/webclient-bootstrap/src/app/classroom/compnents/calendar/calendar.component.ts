import { Component, OnInit } from '@angular/core';
import { QuizArrayI } from '../statistics/user-statistics.component';

@Component({
  selector: 'app-class-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  quizeArray: QuizArrayI[] = [
    {
      quizId: '2',
      time: 8,
    },
    {
      quizId: '5',
      time: 13,
    },
  ];

  ngOnInit() {}
}
