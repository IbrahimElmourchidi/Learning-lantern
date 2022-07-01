import { Component } from '@angular/core';

export interface QuizArrayI {
  quizId: string;
  time: number;
}

@Component({
  selector: 'app-user-statistics',
  templateUrl: 'user-statistics.component.html',
  styleUrls: ['user-statistics.component.scss'],
})
export class UserStatisticsComponent {}
