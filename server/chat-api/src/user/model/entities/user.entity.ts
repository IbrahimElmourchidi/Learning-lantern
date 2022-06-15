import { Room } from 'src/chat/model/entities/room.entity';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';

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

  @ManyToMany(() => Room, (room) => room.users, { onDelete: 'CASCADE' })
  rooms: Room[];
}
