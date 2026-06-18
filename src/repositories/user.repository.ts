import { UserEntity } from '../database/entities/user.entity.js';
import { CreateUserDTO } from '../dto/auth/register.dto.js';
import dataSource from './../database/data-source.js';

const repository = dataSource.getRepository(UserEntity)

export const userRepository = {
  create(data: CreateUserDTO){
      const user = repository.create(data);
      return repository.save(user)
  },
  
  findByEmail(email: string) {
    return repository.findOneBy({ email })
  }
}
