import { User } from 'src/user/model/entities/user.entity';
import { UserI } from 'src/user/model/interfaces/user.interface';

export interface RoomI {
  Id: string;
  Name: string;
  users: UserI[];
}
