import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthListenerController {
  constructor() {}

  // @MessagePattern('newUser')
  // async getNotifications(user: User) {
  //   const userInstance = this.userHelper.createUserInstance(user);
  //   return await this.userService.createUser(userInstance);
  // }
}
