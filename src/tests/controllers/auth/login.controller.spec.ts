import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as userService from '../../../services/auth/login.service.js';

describe('POST /login (controller)', () => {
  // Success Approach
  it('should login and return tokens', async () => {
    vi.spyOn(userService, 'loginService').mockResolvedValue({
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
    });

    const res = await request(app).post('/login').send({
      email: 'john@gmail.com',
      password: 'admin123',
    });

    expect(res.status).toBe(StatusCode.OK);

    expect(res.body.data).toEqual({
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
    });
  });

  // Failure Approach
  it('should return 400 if credentials are invalid', async () => {
    vi.spyOn(userService, 'loginService').mockRejectedValue({
      message: 'User y/o password incorrect',
      status: StatusCode.BAD_REQUEST,
    });

    const res = await request(app).post('/login').send({
      email: 'wrong@gmail.com',
      password: 'wrongpass',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      error: {
        message: 'User y/o password incorrect',
      },
    });
  });

  // Email validations
  it('should return 400 if email is missing', async () => {
    vi.spyOn(userService, 'loginService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: [
            'The max of characters is 255',
            'email should not be empty',
            'email must be an email',
          ],
        },
      ],
    });

    const res = await request(app).post('/login').send({
      password: 'admin123',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: [
            'The max of characters is 255',
            'email should not be empty',
            'email must be an email',
          ],
        },
      ],
    });
  });

  it('should return 400 if email is empty', async () => {
    vi.spyOn(userService, 'loginService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: ['email should not be empty', 'email must be an email'],
        },
      ],
    });

    const res = await request(app).post('/login').send({
      email: '',
      password: 'admin123',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: ['email should not be empty', 'email must be an email'],
        },
      ],
    });
  });

  it('should return 400 if email is not a valid email', async () => {
    vi.spyOn(userService, 'loginService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: ['email must be an email'],
        },
      ],
    });

    const res = await request(app).post('/login').send({
      email: 'email',
      password: 'admin123',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: ['email must be an email'],
        },
      ],
    });
  });

  // Password validations
  it('should return 400 if password is missing', async () => {
    vi.spyOn(userService, 'loginService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'password',
          constraints: [
            'The max of characters is 255',
            'password should not be empty',
            'password must be a string',
          ],
        },
      ],
    });

    const res = await request(app).post('/login').send({
      email: 'john@gmail.com',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'password',
          constraints: [
            'The max of characters is 255',
            'password should not be empty',
            'password must be a string',
          ],
        },
      ],
    });
  });

  it('should return 400 if password is empty', async () => {
    vi.spyOn(userService, 'loginService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'password',
          constraints: ['password should not be empty'],
        },
      ],
    });

    const res = await request(app).post('/login').send({
      email: 'john@gmail.com',
      password: '',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'password',
          constraints: ['password should not be empty'],
        },
      ],
    });
  });
});
