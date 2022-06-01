import { RolesEnum } from 'src/shared/enums/roles.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { UserI } from '../interfaces/user.interface';

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
    default: RolesEnum.student,
  })
  role: number;

  @BeforeInsert()
  emailTolower() {
    // change the email to lower case
    this.Email = this.Email.toLowerCase();
    // trim the FirstName and LastName to remove extra spaces
    this.FirstName = this.FirstName.trim();
    this.LastName = this.LastName.trim();
  }
}
