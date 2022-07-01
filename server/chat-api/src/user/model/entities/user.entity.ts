import { ConnectedUser } from 'src/chat/model/entities/connected-user.entity';
import { JoinedRoom } from 'src/chat/model/entities/joined-room.entity';
import { Message } from 'src/chat/model/entities/message.entity';
import { Room } from 'src/chat/model/entities/room.entity';
import { Meeting } from 'src/rtc/model/entities/meeting.entity';
import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  Id: string;

  @Column({
    nullable: false,
    default: 4,
  })
  Role: number;

  @Column({
    nullable: false,
    length: 30,
  })
  FirstName: string;

  @Column({
    nullable: false,
    length: 60,
  })
  LastName: string;

  @Column({
    nullable: false,
    default: false,
  })
  isValidated: boolean;

  @OneToMany(() => ConnectedUser, (connection) => connection.user)
  connections: ConnectedUser[];

  @ManyToMany(() => Room, (room) => room.users, { onDelete: 'CASCADE' })
  rooms: Room[];

  @ManyToMany(() => Meeting, (meeting) => meeting.users, {
    onDelete: 'CASCADE',
  })
  meetings: Meeting[];

  @OneToMany(() => JoinedRoom, (joinedRoom) => joinedRoom.room)
  joinedRooms: JoinedRoom[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
