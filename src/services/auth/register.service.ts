import { StatusCode } from '../../constants/status-code.js';
import { CreateUserDTO } from '../../dto/auth/register.dto.js';
import { hashValue } from '../../utils/hash.util.js';
import { userRepository } from '../../repositories/user.repository.js';
import { generateAccessToken } from '../../auth/jwt.js';

export const registerUserService = async (dto: CreateUserDTO) => {
  const existingUser = await userRepository.findByEmail(dto.email);

  if (existingUser)
    return Promise.reject({
      message: 'Sorry, this email already exists',
      status: StatusCode.CONFLICT,
    });

  const hashedPassword = await hashValue(dto.password);

  const user = await userRepository.create({ ...dto, password: hashedPassword });

  return generateAccessToken({ userId: user.id, email: dto.email })
};
