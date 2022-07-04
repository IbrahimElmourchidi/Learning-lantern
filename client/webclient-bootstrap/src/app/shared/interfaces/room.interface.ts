import { MetaI } from './meta.interface';
import { UserI } from './user.interface';

export interface RoomI {
  Id?: string;
  Name: string;
  Description: string;

  users: UserI[];
}

export interface RoomPaginate {
  items: RoomI[];
  meta: MetaI;
}
