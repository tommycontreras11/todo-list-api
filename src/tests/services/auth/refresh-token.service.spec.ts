import { describe, it, expect, vi, afterEach } from 'vitest';
import { userRepository } from '../../../repositories/user.repository.js';
import * as jwt from './../../../auth/jwt.js';
import { UserEntity } from '../../../database/entities/user.entity.js';
import * as hashUtil from './../../../utils/hash.util.js';
import { refreshTokenService } from '../../../services/auth/refresh-token.service.js';
import { JwtPayload } from './../../../auth/jwt.js';
import { StatusCode } from '../../../constants/status-code.js';

describe('refreshTokenService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'hashed-password',
    refreshTokenHash: '',
  };

  it('should return a token', async () => {
    vi.spyOn(jwt, 'generateAccessToken').mockReturnValue('token-generated');

    vi.spyOn(jwt, 'verifyRefreshToken').mockReturnValue({
      userId: 1,
      email: 'john@gmail.com',
    } as JwtPayload);

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      ...user,
    } as UserEntity);

    vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(true);

    const result = await refreshTokenService({ refreshToken: 'refresh-token' });

    expect(result).toEqual('token-generated');

    expect(jwt.generateAccessToken).toHaveBeenCalled();
  });

  // Failure approaches
  it('should reject when user does not exist', async () => {
    vi.spyOn(jwt, 'verifyRefreshToken').mockReturnValue({
      userId: 1,
      email: 'john@gmail.com',
    } as JwtPayload);

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(
      refreshTokenService({
        refreshToken: 'refresh-token',
      }),
    ).rejects.toEqual({
      message: 'User not found',
      status: StatusCode.NOT_FOUND,
    });
  });

  it('should reject when user does not exist', async () => {
    vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(false);

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({ ...user } as UserEntity);

    await expect(
      refreshTokenService({
        refreshToken: 'refresh-token',
      }),
    ).rejects.toEqual({
      message: 'Invalid refresh token',
      status: StatusCode.UNAUTHORIZED,
    });
  });
});
