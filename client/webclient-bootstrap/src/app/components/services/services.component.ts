import { Component } from '@angular/core';
import { ServiceItemI, ServicesList } from './service-list';

@Component({
  selector: 'app-services-list',
  templateUrl: 'services.component.html',
  styleUrls: ['services.component.scss'],
})
export class ServiceListComponent {
  services: ServiceItemI[] = ServicesList;
}
