import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileI } from '../interfaces/profile.interface';
import { User } from './user.entity';

@Entity()
export class Profile implements ProfileI {
  @PrimaryGeneratedColumn()
  Id: number;
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

  @OneToOne(() => User, (user) => user.Profile)
  user: User;

  @BeforeInsert()
  trimName() {
    // trim the FirstName and LastName to remove extra spaces
    this.FirstName = this.FirstName.trim();
    this.LastName = this.LastName.trim();
  }
}
