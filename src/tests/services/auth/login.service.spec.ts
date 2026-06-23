import { describe, it, expect, vi, afterEach } from 'vitest';
import { userRepository } from '../../../repositories/user.repository.js';
import * as jwt from './../../../auth/jwt.js';
import { UserEntity } from '../../../database/entities/user.entity.js';
import * as hashUtil from './../../../utils/hash.util.js';
import { loginService } from '../../../services/auth/login.service.js';
import * as updateUserService from '../../../services/user/update.service.js';
import { StatusCode } from '../../../constants/status-code.js';

describe('loginService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'hashed-password',
    refreshTokenHash: '',
  };

  // Success Approach
  it('should login and return tokens', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(
      user as UserEntity,
    );

    vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(true);

    vi.spyOn(jwt, 'generateAccessToken').mockReturnValue('fake-access-token');

    vi.spyOn(jwt, 'generateRefreshToken').mockReturnValue('fake-refresh-token');

    vi.spyOn(hashUtil, 'hashValue').mockResolvedValue('hashed-token');

    vi.spyOn(updateUserService, 'updateUserService').mockResolvedValue({
      affected: 1,
      generatedMaps: [],
      raw: {},
    });

    const result = await loginService({
      email: user.email,
      password: 'admin123',
    });

    expect(result).toEqual({
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
    });

    expect(hashUtil.compareHash).toHaveBeenCalledWith(
      'admin123',
      'hashed-password',
    );

    expect(jwt.generateAccessToken).toHaveBeenCalled();

    expect(jwt.generateRefreshToken).toHaveBeenCalled();

    expect(updateUserService.updateUserService).toHaveBeenCalledWith(
      1,
      'hashed-token',
    );
  });

  // Failure approaches
  it('should reject when user does not exist', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(
      loginService({
        email: 'john@gmail.com',
        password: 'admin123',
      }),
    ).rejects.toEqual({
      message: 'User y/o password incorrect',
      status: StatusCode.BAD_REQUEST,
    });
  });

  it('should reject when password is incorrect', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      ...user,
    } as UserEntity);

    vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(false);

    await expect(
      loginService({
        email: 'john@gmail.com',
        password: 'admin123',
      }),
    ).rejects.toEqual({
      message: 'User y/o password incorrect',
      status: StatusCode.BAD_REQUEST,
    });
  });

  it('should propagate update user errors', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(
      user as UserEntity,
    );

    vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(true);

    vi.spyOn(jwt, 'generateAccessToken').mockReturnValue('fake-access-token');

    vi.spyOn(jwt, 'generateRefreshToken').mockReturnValue('fake-refresh-token');

    vi.spyOn(hashUtil, 'hashValue').mockResolvedValue('hashed-token');

    vi.spyOn(updateUserService, 'updateUserService').mockRejectedValue(
      new Error('DB error'),
    );

    await expect(
      loginService({
        email: user.email,
        password: 'admin123',
      }),
    ).rejects.toThrow('DB error');
  });
});
