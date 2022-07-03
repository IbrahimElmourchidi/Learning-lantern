import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { map } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';

export interface EventI {
  Title: string;
  StartDate: Date;
  DueDate: Date;
  Description: String;
}

export interface CalendarEventI {
  title: string;
  start: string;
  end: string;
}

@Component({
  selector: 'app-class-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.doGet(env.calendarRoot, {}).subscribe(
      (res) => {
        console.log('res\n', res);
        const result = res as EventI[];
        const eventList: CalendarEventI[] = [];
        for (let i of result) {
          const incommingEvent: CalendarEventI = {
            title: i.Title,
            start: new Date(i.StartDate).toISOString().split('T')[0],
            end: new Date(i.DueDate).toISOString().split('T')[0],
          };
          eventList.push(incommingEvent);
        }
        console.log('eventList:\n', eventList);
        this.calendarOptions.events = eventList;
      },
      (err) => {
        console.log(err.errro);
      }
    );
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap5',
    events: [],
  };
}
