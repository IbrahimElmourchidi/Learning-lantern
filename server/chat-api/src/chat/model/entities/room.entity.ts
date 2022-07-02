import { User } from 'src/user/model/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomI } from '../interfaces/room.interface';
import { JoinedRoom } from './joined-room.entity';
import { Message } from './message.entity';

@Entity()
export class Room implements RoomI {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column({
    nullable: false,
    length: 30,
  })
  Name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToOne(() => JoinedRoom, (joinedUser) => joinedUser.room)
  joinedUsers: JoinedRoom[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
