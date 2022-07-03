import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { tokenGetter } from 'src/app/app.module';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';
export interface Task {
  Id: number;
  Title: string;
  Description: string;
  StartDate: Date | DateNGBI | string;
  DueDate: Date | DateNGBI | string;
  Important: boolean;
  Completed: boolean;
  MyDay: boolean;
}
interface TaskListI {
  [key: string]: Task;
}

export interface DateNGBI {
  year: number;
  month: number;
  day: number;
}
@Component({
  selector: 'app-class-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss'],
})
export class TodoComponent implements OnInit {
  model!: NgbDateStruct;
  date!: { year: number; month: number };
  acitveTab = 'My Day';
  today = this.dateParser(new Date());
  changes = false;
  create = false;

  myDayTasks: TaskListI = {};
  TaskId!: FormControl;
  TaskTitle!: FormControl;
  TaskDescription!: FormControl;
  StartDate!: FormControl;
  DueDate!: FormControl;
  Important!: FormControl;
  Completed!: FormControl;
  taskFrom!: FormGroup;
  constructor(private calendar: NgbCalendar, private http: HttpService) {
    this.initFromControl();
    this.initFrom();
  }

  ngOnInit(): void {
    this.http.doGet(env.todoRoot, {}).subscribe(
      (res) => {
        console.log(res);
        const result = res as TaskListI;
        this.myDayTasks = result;
      },
      (err) => {
        console.log(err.error);
      }
    );
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
    this.TaskId = new FormControl(1);
    this.TaskTitle = new FormControl('');
    this.TaskDescription = new FormControl('');
    this.StartDate = new FormControl('2014-01-01');
    this.DueDate = new FormControl('');
    this.Completed = new FormControl(false);
    this.Important = new FormControl(false);
  }

  initFrom() {
    this.taskFrom = new FormGroup({
      TaskTitle: this.TaskTitle,
      TaskDescription: this.TaskDescription,
      StartDate: this.StartDate,
      DueDate: this.DueDate,
      Completed: this.Completed,
      Important: this.Important,
    });
  }

  dateParser(dateObj: Date) {
    console.log(typeof dateObj);
    console.log(dateObj);

    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    console.log({
      year,
      month,
      day,
    });
    return {
      year,
      month,
      day,
    };
  }

  dateCreator(date: { year: number; month: number; day: number }) {
    return new Date(date.year, date.month - 1, date.day + 1);
  }

  onSubmit() {
    if (this.create) {
      const id = undefined;
      this.create = false;
      const completed = false;
      const _body = {
        id,
        title: this.TaskTitle.value,
        description: this.TaskDescription.value,
        startDate: this.dateCreator(this.StartDate.value),
        dueDate: this.dateCreator(this.DueDate.value),
        important: this.Important.value,
        completed,
      };
      console.log(_body);
      this.http.doPost(env.todoRoot, _body, {}).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else if (this.changes && !this.create) {
      console.log('lets edit');
      const id = this.TaskId;
      this.changes = false;
      const completed = this.Completed;
      const _body = {
        id,
        title: this.TaskTitle.value,
        description: this.TaskDescription.value,
        startDate: this.dateCreator(this.StartDate.value),
        dueDate: this.dateCreator(this.DueDate.value),
        important: this.Important.value,
        completed: this.Completed.value,
      };
      console.log(_body);
      this.http
        .doPut(env.todoRoot + '/' + this.TaskId.value, _body, {})
        .subscribe(
          (res) => {
            const result = res as Task;
            this.myDayTasks[result.Id] = result;
            console.log('res was recieved');
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  deleteTask(task: Task) {
    this.http.doDelete(env.todoRoot + '/' + task.Id, {}).subscribe(
      (res) => {
        const result = res as string;
        delete this.myDayTasks[result];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  completeTask(task: Task) {
    task.Completed = true;
    this.http.doPut(env.todoRoot + '/' + task.Id, task, {}).subscribe(
      (res) => {
        const result = res as Task;
        this.myDayTasks[result.Id] = result;
        console.log('res was recieved');
        console.log(res);
      },
      (err) => {
        task.Completed = false;
        console.log(err);
      }
    );
  }

  setActiveTask(task: Task) {
    this.TaskId.setValue(task.Id);
    this.Completed.setValue(task.Completed);
    this.TaskDescription.setValue(task.Description);
    this.DueDate.setValue(this.dateParser(new Date(task.DueDate as string)));
    this.StartDate.setValue(
      this.dateParser(new Date(task.StartDate as string))
    );
    this.Important.setValue(task.Important);
    this.TaskTitle.setValue(task.Title);
  }
}
