import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as todoService from '../../../services/todo/update-todo.service.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import * as jwt from '../../../auth/jwt.js';

describe('PUT /todos/{id} (controller)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const todo = {
    id: 1,
    title: 'New todo',
    description: 'Description',
  };

  const token = jwt.generateAccessToken({
    email: 'john@gmail.com',
    userId: 1,
  });

  it('it should update a todo and return it', async () => {
    vi.spyOn(todoService, 'updateTodoService').mockResolvedValue(
      todo as TodoEntity,
    );

    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: todo.title,
        description: todo.description,
      });

    expect(res.status).toBe(StatusCode.OK);

    expect(res.body.data).toEqual(todo);
  });

  // Id validations
  it('should return 400 if id is not found', async () => {
    vi.spyOn(todoService, 'updateTodoService').mockRejectedValue({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: todo.title,
        description: todo.description,
      });

    expect(res.status).toBe(StatusCode.NOT_FOUND);

    expect(res.body).toEqual({
      error: {
        message: 'Todo not found',
      },
    });
  });

  // Title validations
  it('should return 400 if title is missing', async () => {
    vi.spyOn(todoService, 'updateTodoService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'title',
          constraints: [
            'The max of characters is 255',
            'title must be a string',
            'title should not be empty',
          ],
        },
      ],
    });

    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: todo.description,
      });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'title',
          constraints: [
            'The max of characters is 255',
            'title must be a string',
            'title should not be empty',
          ],
        },
      ],
    });
  });

  it('should return 400 if title is empty', async () => {
    vi.spyOn(todoService, 'updateTodoService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'title',
          constraints: ['title should not be empty'],
        },
      ],
    });

    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '',
        description: todo.description,
      });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'title',
          constraints: ['title should not be empty'],
        },
      ],
    });
  });

  // Description validations
  it('should return 400 if description is missing', async () => {
    vi.spyOn(todoService, 'updateTodoService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'description',
          constraints: [
            'description must be a string',
            'description should not be empty',
          ],
        },
      ],
    });

    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: todo.title,
      });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'description',
          constraints: [
            'description must be a string',
            'description should not be empty',
          ],
        },
      ],
    });
  });

  it('should return 400 if description is empty', async () => {
    vi.spyOn(todoService, 'updateTodoService').mockRejectedValue({
      message: 'Validation failed',
      errors: [
        {
          field: 'description',
          constraints: ['description should not be empty'],
        },
      ],
    });

    const res = await request(app)
      .put(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: todo.title,
        description: '',
      });

    expect(res.status).toBe(StatusCode.BAD_REQUEST);

    expect(res.body).toEqual({
      message: 'Validation failed',
      errors: [
        {
          field: 'description',
          constraints: ['description should not be empty'],
        },
      ],
    });
  });
});
