import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity.js';
import { TodoEntity } from './to-do.entity.js';

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  password: string;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[]
}