import { User } from 'src/user/model/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class JoinedRoom {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  SocketId: string;
  @ManyToOne(() => User, (user) => user.joinedRooms)
  @JoinColumn()
  user: User;
  @ManyToOne(() => Room, (room) => room.joinedUsers)
  @JoinColumn()
  room: Room;
}
