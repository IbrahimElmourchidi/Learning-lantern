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

/** this entity defines the user table in the database */
@Entity()
export class User implements UserI {
  /** id is of type uuid */
  @Index()
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Index()
  /** email must be unique and lower case */
  @Column({
    nullable: false,
    unique: true,
    length: 128,
  })
  Email: string;
  /** password must contain Uppercase letter+lowercase letter+ numbers and minimum length 8 */
  @Column({
    nullable: false,
    length: 60,
  })
  Password: string;
  /** the data the account was created */
  @CreateDateColumn({
    type: Date,
  })
  DateCreated: Date;
  /** validation code check if user entered a real email that he owns */
  @Column({
    length: 8,
    nullable: false,
  })
  ValidationCode: string;
  /** if the user's email is validated or not */
  @Column({
    nullable: false,
    default: false,
  })
  IsValidated: boolean;
  /** if the user is confirmed by the university admin or not */
  @Column({
    nullable: false,
    default: false,
  })
  IsConfirmed: boolean;
  /**the role of the user its number type you can found what this number means in the rolesEnum */
  @Column({
    nullable: false,
    default: RolesEnum.student,
  })
  role: number;

  /** @ignore */
  @OneToOne(() => Profile, (Profile) => Profile.user)
  @JoinColumn()
  Profile: Profile;

  /** makes sure that the email in lower case */
  @BeforeInsert()
  emailTolower() {
    // change the email to lower case
    this.Email = this.Email.toLowerCase();
  }
}
