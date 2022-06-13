import { User } from 'src/user/model/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomI } from '../interfaces/room.interface';

@Entity()
export class Room implements RoomI {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column({
    nullable: false,
  })
  Name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
