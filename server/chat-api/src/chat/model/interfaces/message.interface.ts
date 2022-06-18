import { UserI } from 'src/user/model/interfaces/user.interface';
import { RoomI } from './room.interface';

export interface MessageI {
  Id?: string;
  text: string;
  user: UserI;
  room: RoomI;
  created_at: Date;
  updated_at: Date;
}
