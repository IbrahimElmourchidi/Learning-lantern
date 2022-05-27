import { Component } from '@angular/core';
import { ServiceItemI } from 'src/app/shared/interfaces/service-item.interface';
/**
 * the component that contains all of our services infor
 */
@Component({
  selector: 'app-services-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServicesListComponent {
  /** current service info */
  activeService = 0;
  /**
   * this is the list of all the services and their info
   * todo: get requested from admin api
   */
  servicesList: ServiceItemI[] = [
    {
      imgSrc: '/assets/img/live-lectures.webp',
      altText: 'Live Lectures',
      serviceName: 'Live Lectures',
      serviceDescription: `<p>Connect students and instructors together via <span class='imp'>Interactive Online Meetings</span> which emulates the real learning environment</p>`,
    },
    {
      imgSrc: '/assets/img/video.webp',
      altText: 'Interactive Video',
      serviceName: 'Interactive Video',
      serviceDescription: `<p>Learning is available any where any time using our <span class='imp'>Vidoe hosting service</span> with interactivity features like in-video quizzes, caption ...and more.</p>`,
    },
    {
      imgSrc: '/assets/img/chat.webp',
      altText: 'Instant Chat',
      serviceName: 'Instant Chat',
      serviceDescription: `<p>Instructors and students stay connected via realtime <span class='imp'>Instant Messages</span>.</p>`,
    },
    {
      imgSrc: '/assets/img/exam.webp',
      altText: 'Online Exams & Quizzes',
      serviceName: 'Online Exams & Quizzes',
      serviceDescription: `<p>Test your student online using our <span class='imp'>Online Exam System</span>, with a handful of features like automatic grading, anti-cheat strategies, ...and more.</p>`,
    },
    {
      imgSrc: '/assets/img/todo.webp',
      altText: 'Integrated Calendar & Todo-list',
      serviceName: 'Integrated Calendar & Todo-list',
      serviceDescription: `<p>Students can keep organized with our <span class='imp'>integrated Calender & ToDo list</span> service.</p>`,
    },
    {
      imgSrc: '/assets/img/text.webp',
      altText: 'Online Text Lessson',
      serviceName: 'Online Text Lesson',
      serviceDescription: `<p>Use our <span class='imp'>Online Text Editor</span> to create text lessons for the student, including inline quizez and progress monitor.</p>`,
    },
  ];
  /** go to the next service info */
  nextService() {
    this.activeService = this.activeService + 1;
  }
  /** go to the previous service info */
  prevService() {
    this.activeService = this.activeService - 1;
  }
}
