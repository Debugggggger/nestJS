import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { Photo } from '../photos/photo.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column({ default: true })
  isActive: boolean;
}
