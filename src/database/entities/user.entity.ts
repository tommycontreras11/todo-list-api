import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
