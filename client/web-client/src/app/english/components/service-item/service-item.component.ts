import { Component, Input } from '@angular/core';
import { ServiceItemI } from 'src/app/shared/interfaces/service-item.interface';
/**
 * the component that descript what service is
 */
@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent {
  /** service info */
  @Input('serviceDetail') serviceDetail: ServiceItemI = {
    altText: 'default',
    imgSrc: 'defalut',
    serviceDescription: 'default',
    serviceName: 'default',
  };

  // todo: add demo button functionality
}
