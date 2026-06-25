import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as refreshTokenService from '../../../services/auth/refresh-token.service.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../auth/jwt.js';

describe('POST /refresh-token (controller)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should regenerate a token', async () => {
    const refreshToken = generateRefreshToken({
      userId: 1,
      email: 'john@gmail.com',
    });
    vi.spyOn(refreshTokenService, 'refreshTokenService').mockResolvedValue(
      refreshToken,
    );

    const token = generateAccessToken({ userId: 1, email: 'john@gmail.com' });

    const response = await request(app)
      .post('/refresh-token')
      .set('Authorization', `Bearer ${token}`)
      .send({
        refreshToken: 'fake-refresh-token',
      });

    expect(response.status).toBe(StatusCode.OK);

    expect(response.body.token).toBe(refreshToken);
  });
});
