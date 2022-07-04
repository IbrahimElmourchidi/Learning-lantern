import { MetaI } from './meta.interface';
import { RoomI } from './room.interface';
import { UserI } from './user.interface';

export interface MessageI {
  Id?: string;
  text: string;
  file?: string;
  fileType?: string;
  user?: UserI;
  room: RoomI;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessagePaginateI {
  items: MessageI[];
  meta: MetaI;
}
