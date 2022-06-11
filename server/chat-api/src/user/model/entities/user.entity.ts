import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  Id: string;
  @Column({
    unique: true,
  })
  PImage: string;
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
}
