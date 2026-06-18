import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity.js';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: "number"
  })
  userId: number

  @ManyToOne(() => UserEntity, (user) => user.todos, {
    nullable: false
  })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: UserEntity;
}
