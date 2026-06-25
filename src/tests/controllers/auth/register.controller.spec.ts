import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import * as userService from '../../../services/auth/register.service.js';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';

describe('POST /register (controller)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Success Approach
  it('should create a user and return a token', async () => {
    vi.spyOn(userService, 'registerUserService').mockResolvedValue(
      'fake-token',
    );

    const response = await request(app).post('/register').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'admin123',
    });

    expect(response.status).toBe(StatusCode.CREATED);
    expect(response.body.token).toBe('fake-token');
  });

  // Name validations
  it('should return 400 if name is missing', async () => {
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'name',
          constraints: [
            'The max of characters is 100',
            'name should not be empty',
            'name must be a string',
          ],
        },
      ],
    });

    const res = await request(app).post('/register').send({
      email: 'john@gmail.com',
      password: 'admin123',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'name',
          constraints: [
            'The max of characters is 100',
            'name should not be empty',
            'name must be a string',
          ],
        },
      ],
    });
  });

  it('should return 400 if name is empty', async () => {
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'name',
          constraints: ['name should not be empty'],
        },
      ],
    });

    const res = await request(app).post('/register').send({
      name: '',
      email: 'john@gmail.com',
      password: 'admin123',
    });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'name',
          constraints: ['name should not be empty'],
        },
      ],
    });
  });

  // Email validations
  it('should return 400 if email is missing', async () => {
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
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

    const res = await request(app).post('/register').send({
      name: 'John Doe',
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
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: ['email should not be empty', 'email must be an email'],
        },
      ],
    });

    const res = await request(app).post('/register').send({
      name: 'John Doe',
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
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          constraints: ['email must be an email'],
        },
      ],
    });

    const res = await request(app).post('/register').send({
      name: 'John Doe',
      email: 'john',
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
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
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

    const res = await request(app).post('/register').send({
      name: 'John Doe',
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
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'password',
          constraints: ['password should not be empty'],
        },
      ],
    });

    const res = await request(app).post('/register').send({
      name: 'John Doe',
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

  // Validate if email exists
  it('should return 409 if email already exists', async () => {
    vi.spyOn(userService, 'registerUserService').mockRejectedValue({
      message: 'Sorry, this email already exists',
      status: StatusCode.CONFLICT,
    });

    const response = await request(app).post('/register').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'admin123',
    });

    expect(response.status).toBe(StatusCode.CONFLICT);
    expect(response.body.error.message).toBe(
      'Sorry, this email already exists',
    );
  });
});
