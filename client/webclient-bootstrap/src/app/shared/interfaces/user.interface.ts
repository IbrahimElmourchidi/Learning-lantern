import { RoomI } from './room.interface';

export interface UserI {
  Id?: string;
  FirstName: string;
  LastName: string;
  rooms?: RoomI[];
}
