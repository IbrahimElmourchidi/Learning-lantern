import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthListenerController {
  @MessagePattern('new')
  getNotifications(data: string) {
    console.log(data);
  }
}
