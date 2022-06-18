import { User } from 'src/user/model/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ConnectedUser {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    nullable: false,
  })
  SocketId: string;

  @ManyToOne(() => User, (user) => user.connections)
  user: User;
}
