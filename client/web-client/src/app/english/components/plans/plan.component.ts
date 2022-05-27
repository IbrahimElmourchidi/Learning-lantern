import { Component } from '@angular/core';
/**
 * contains all the plans avaliable for subscription
 */
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent {
  /** all plan list
   * todo: later will be requested from admin api */
  planList = [
    {
      name: 'Free Plan',
      detail: {
        'Live Lectures': 'NA',
        'Instant Chat': 'NA',
        'Interactive Video': 'Free up to 1GB',
        'Online Exam & Quizes': 'Free up to 20 Exams',
        'Calender & Todo List': 'Unlimited',
        'Text Lessons': 'Free up to 500MB',
      },
    },
    {
      name: 'Premium Plan',
      detail: {
        'Live Lectures': '5 USD/student',
        'Instant Chat': 'Unlimited',
        'Interactive Video': '1 USD/1GB',
        'Online Exam & Quizes': 'UnLimited',
        'Calender & Todo List': 'Unlimited',
        'Text Lessons': '1 USD/GB',
      },
    },
  ];
}
