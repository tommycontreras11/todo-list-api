import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity.js';
import { UserEntity } from './user.entity.js';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity
}
