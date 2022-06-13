import { Room } from 'src/chat/model/entities/room.entity';

export interface UserI {
  Id: string;
  Role: number;
  FirstName: string;
  LastName: string;

  rooms?: Room[];
}
