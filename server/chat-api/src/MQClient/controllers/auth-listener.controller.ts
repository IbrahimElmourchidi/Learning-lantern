import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Message, RMQMessage, RMQRoute } from 'nestjs-rmq';
import { User } from 'src/user/model/entities/user.entity';
import { UserHelperService } from 'src/user/services/user-helper.service';
import { UserService } from 'src/user/services/user.service';

@Controller()
export class AuthListenerController {
  constructor(
    private userService: UserService,
    private userHelper: UserHelperService,
  ) {}
  // @RMQRoute('UserEvent')
  // createUser(@RMQMessage data: Message) {
  //   console.log(data);
  //   const user: User = JSON.parse(data.content.toString());
  //   this.userService.createUser(user);
  //   this.rmqService.ack(data);
  // }

  // @RMQRoute('DeleteUserEvent')
  // deleteUser(@RMQMessage Id: Message): void {
  //   console.log(Id);
  //   this.userService.deleteUser(JSON.parse(Id.content.toString()));
  //   this.rmqService.ack(Id);
  // }

  // @RMQRoute('newRoom')
  // newRoom(data: any) {
  //   console.log(data);
  //   return 1;
  // }

  @MessagePattern('LearningLantern.UserEvent')
  newUser(@Payload() data, @Ctx() context: RmqContext) {
    console.log(data);
  }

  @MessagePattern('DeleteUserEvent')
  deleteUser(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log(data);
    channel.ack(originalMsg);
  }
}
