import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/model/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ListenService {
  constructor(private userService: UserService) {}

  @RabbitRPC({
    exchange: 'LearningLantern',
    routingKey: 'UserEvent',
    queue: 'auth',
  })
  public async newUser(data: User) {
    try {
      this.userService.createUser(data);
    } catch (error) {
      console.log('invalid rabbit data');
    }
    return {
      response: 42,
    };
  }

  @RabbitRPC({
    exchange: 'LearningLantern',
    routingKey: 'DeleteUserEvent',
    queue: 'auth',
  })
  public async deleteUser(userId: string) {
    this.userService.deleteUser(userId);
    return {
      response: 42,
    };
  }
}

// {
//   Id: '44758929-e782-4c99-ba34-d98a62a896b2',
//   FirstName: 'hema',
//   LastName: 'mohamed'
// }
