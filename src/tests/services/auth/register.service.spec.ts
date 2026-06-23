import { describe, it, expect, vi, afterEach } from 'vitest';
import { userRepository } from '../../../repositories/user.repository.js';
import { registerUserService } from '../../../services/auth/register.service.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as hashUtil from "./../../../utils/hash.util.js"
import * as jwt from "./../../../auth/jwt.js"
import { UserEntity } from '../../../database/entities/user.entity.js';

describe('registerUserService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // Success Approach
  it("should create a user and return a token", async () => {
    vi.spyOn(userRepository, "findByEmail")
      .mockResolvedValue(null)

    vi.spyOn(hashUtil, "hashValue")
      .mockResolvedValue("hashed-password")

    vi.spyOn(userRepository, "create")
      .mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
        password: "admin123",
        refreshTokenHash: ""
      } as UserEntity)
    
    vi.spyOn(jwt, "generateAccessToken")
      .mockResolvedValue("fake-token")

    const result = await registerUserService({
        name: "John Doe",
        email: "john@gmail.com",
        password: "admin123",
    })

    expect(result).toBe("fake-token")
  })

  // Failure Approach
  it('should throw if email already exists', async () => {
    vi.spyOn(userRepository, 'findByEmail')
      .mockResolvedValue({
        id: 1,
        email: 'john@gmail.com',
      } as any);

    await expect(
      registerUserService({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'admin123',
      })
    ).rejects.toEqual({
      message: 'Sorry, this email already exists',
      status: StatusCode.CONFLICT,
    });
  });

});