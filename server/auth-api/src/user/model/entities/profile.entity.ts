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

/** this class define the profile table in the database */
@Entity()
export class Profile implements ProfileI {
  /** PK of type number */
  @PrimaryGeneratedColumn()
  Id: number;
  /** fistname of the user */
  @Column({
    nullable: false,
    length: 30,
  })
  FirstName: string;
  /** user's last name */
  @Column({
    nullable: false,
    length: 60,
  })
  LastName: string;

  /** the foreign key with the user table */
  @OneToOne(() => User, (user) => user.Profile)
  user: User;

  /** make sure to remove extra spaces in the names before insert or else the user can use empty spaces as a name */
  @BeforeInsert()
  trimName() {
    // trim the FirstName and LastName to remove extra spaces
    this.FirstName = this.FirstName.trim();
    this.LastName = this.LastName.trim();
  }
}
