import { UserI } from 'src/user/model/interfaces/user.interface';
import { RoomI } from './room.interface';

export interface JoinedRoomI {
  Id?: number;
  SocketId: string;
  user: UserI;
  room: RoomI;
}
