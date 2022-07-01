import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

export interface Task {
  Id: string;
  Title: string;
  Description: string;
  Important: boolean;
  Completed: boolean;
}

@Component({
  selector: 'app-class-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss'],
})
export class TodoComponent {
  model!: NgbDateStruct;
  date!: { year: number; month: number };
  acitveTab = 'My Day';

  myDayTasks: Task[] = [
    {
      Id: '1',
      Title: 'Task One Task OneTask One',
      Description: 'this is task one',
      Important: true,
      Completed: false,
    },
    {
      Id: '2',
      Title: 'Task Two',
      Description: 'this is task two',
      Important: false,
      Completed: false,
    },
    {
      Id: '3',
      Title: 'completed task',
      Description: 'this is completed',
      Important: false,
      Completed: true,
    },
  ];
  activeTask = {
    Id: '1',
    Title: 'Task One Task OneTask One',
    Description: 'this is task one',
    Important: true,
    Completed: false,
  };
  TaskTitle!: FormControl;
  TaskDescription!: FormControl;
  StartDate!: FormControl;
  DueDate!: FormControl;
  Important!: FormControl;
  Completed!: FormControl;
  taskFrom!: FormGroup;
  constructor(private calendar: NgbCalendar) {
    this.initFromControl();
    this.initFrom();
  }

  collapseIt(str: string) {
    this.acitveTab = str;
    document.getElementById('collapseBtn')?.classList.add('collapsed');
    document.getElementById('collapseTwo')?.classList.remove('show');
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
  completed(taskId: string) {
    console.log(taskId);
  }

  initFromControl() {
    this.TaskTitle = new FormControl('');
    this.TaskDescription = new FormControl('');
    this.StartDate = new FormControl('');
    this.DueDate = new FormControl('');
    this.Completed = new FormControl('');
  }

  initFrom() {
    this.taskFrom = new FormGroup({
      TaskTitle: this.TaskTitle,
      TaskDescription: this.TaskDescription,
      StartDate: this.StartDate,
      DueDate: this.DueDate,
      Completed: this.Completed,
    });
  }

  switchActiveTask(task: Task) {
    this.activeTask = task;
  }
}
