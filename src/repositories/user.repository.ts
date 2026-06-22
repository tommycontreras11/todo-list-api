import { UserEntity } from '../database/entities/user.entity.js';
import { CreateUserDTO } from '../dto/auth/register.dto.js';
import dataSource from './../database/data-source.js';

const repository = dataSource.getRepository(UserEntity)

export const userRepository = {  
  findByEmail(email: string) {
    return repository.findOneBy({ email })
  },

  create(data: CreateUserDTO) {
      const user = repository.create(data);
      return repository.save(user)
  },

  update(id: number, refreshToken: string) {
    return repository.update(id, { refreshTokenHash: refreshToken })
  }
}
