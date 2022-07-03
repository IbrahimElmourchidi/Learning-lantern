import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ListenService {
  constructor(private userService: UserService) {}

  @RabbitRPC({
    exchange: 'LearningLantern',
    routingKey: 'UserEvent',
    queue: 'auth',
  })
  public async newUser(data: {}) {
    console.log(data);
    // const user: User = data;
    // this.userService.createUser(user);
    return {
      response: 42,
    };
  }

  @RabbitRPC({
    exchange: 'LearningLantern',
    routingKey: 'DeleteUserEvent',
    queue: 'auth',
  })
  public async deleteUser(data: {}) {
    console.log(data);
    // this.userService.deleteUser(JSON.parse(Id.content.toString()));
    return {
      response: 42,
    };
  }
}
