import { Room } from 'src/chat/model/entities/room.entity';
import { User } from 'src/user/model/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  MeetingTitle: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinTable()
  room: Room;

  @CreateDateColumn()
  StartDate: Date;

  @Column({
    type: Date,
  })
  EndDate: Date;
}
