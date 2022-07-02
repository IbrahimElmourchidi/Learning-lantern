import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Message, RMQMessage, RMQRoute, RMQService } from 'nestjs-rmq';
import { User } from 'src/user/model/entities/user.entity';
import { UserHelperService } from 'src/user/services/user-helper.service';
import { UserService } from 'src/user/services/user.service';

@Controller()
export class AuthListenerController {
  constructor(
    private userService: UserService,
    private userHelper: UserHelperService,
    private readonly rmqService: RMQService,
  ) {}
  @RMQRoute('UserEvent')
  createUser(@RMQMessage data: Message) {
    console.log(data);
    const user: User = JSON.parse(data.content.toString());
    this.userService.createUser(user);
    this.rmqService.ack(data);
  }

  @RMQRoute('DeleteUserEvent')
  deleteUser(@RMQMessage Id: Message): void {
    console.log(Id);
    this.userService.deleteUser(JSON.parse(Id.content.toString()));
    this.rmqService.ack(Id);
  }

  // @RMQRoute('newRoom')
  // newRoom(data: any) {
  //   console.log(data);
  //   return 1;
  // }
}
