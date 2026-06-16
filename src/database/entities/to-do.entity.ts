import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
