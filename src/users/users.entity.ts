import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  userID: string;

  @Column()
  password: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'default' })
  nickname: string;
}
