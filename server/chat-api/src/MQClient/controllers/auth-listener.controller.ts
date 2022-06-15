import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'src/user/model/entities/user.entity';
import { UserHelperService } from 'src/user/services/user-helper.service';
import { UserService } from 'src/user/services/user.service';

@Controller()
export class AuthListenerController {
  constructor(
    private userService: UserService,
    private userHelper: UserHelperService,
  ) {}
  @MessagePattern('newUser')
  async getNotifications(user: User) {
    const userInstance = this.userHelper.createUserInstance(user);
    return await this.userService.createUser(userInstance);
  }
}
