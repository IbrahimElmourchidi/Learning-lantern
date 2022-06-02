import { RolesEnum } from 'src/shared/enums/roles.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  BeforeInsert,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { UserI } from '../interfaces/user.interface';
import { Profile } from './profile.entity';

@Entity()
export class User implements UserI {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Index()
  @Column({
    nullable: false,
    unique: true,
    length: 128,
  })
  Email: string;
  @Column({
    nullable: false,
    length: 60,
  })
  Password: string;

  @CreateDateColumn({
    type: Date,
  })
  DateCreated: Date;
  @Column({
    length: 8,
    nullable: false,
  })
  ValidationCode: string;
  @Column({
    nullable: false,
    default: false,
  })
  IsValidated: boolean;
  @Column({
    nullable: false,
    default: false,
  })
  IsConfirmed: boolean;
  @Column({
    nullable: false,
    default: RolesEnum.student,
  })
  role: number;

  @OneToOne(() => Profile, (Profile) => Profile.user)
  @JoinColumn()
  Profile: Profile;

  @BeforeInsert()
  emailTolower() {
    // change the email to lower case
    this.Email = this.Email.toLowerCase();
  }
}
