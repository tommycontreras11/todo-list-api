import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as todoService from '../../../services/todo/get-todo-by-id.service.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import * as jwt from '../../../auth/jwt.js';

describe('GET /todos/{id} (controller)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const todo = {
    id: 1,
    title: 'New todo',
    description: 'Description',
  } as TodoEntity;

  const token = jwt.generateAccessToken({
    email: 'john@gmail.com',
    userId: 1,
  });

  it('it should return a todo based on a id', async () => {
    vi.spyOn(todoService, 'getTodoByIdService').mockResolvedValue(todo);

    const res = await request(app)
      .get(`/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCode.OK);

    expect(res.body.data).toEqual(todo);
  });

  // Id validations
  it('should return 400 if id is not found', async () => {
    vi.spyOn(todoService, 'getTodoByIdService').mockRejectedValue({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

    const res = await request(app)
      .get(`/todos/${1}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCode.NOT_FOUND);

    expect(res.body).toEqual({
      error: {
        message: 'Todo not found',
      },
    });
  });
});
