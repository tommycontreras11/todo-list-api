import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as todoService from '../../../services/todo/get-all-todos.service.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import * as jwt from '../../../auth/jwt.js';

describe('GET /todos (controller)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const todos = [
    {
      id: 1,
      title: 'New todo',
      description: 'Description',
    },
  ] as TodoEntity[];

  const token = jwt.generateAccessToken({
    email: 'john@gmail.com',
    userId: 1,
  });

  it('it should return all the todos', async () => {
    vi.spyOn(todoService, 'getAllTodoService').mockResolvedValue([todos, 1]);

    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCode.OK);

    expect(res.body.data).toEqual(todos);
  });

  // Todos filtered
  it('should return the todos filtered', async () => {
    vi.spyOn(todoService, 'getAllTodoService').mockResolvedValue([todos, 1]);

    const limit = 4;
    const page = 1;

    const res = await request(app)
      .get(`/todos?page=${page}&limit=${limit}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCode.OK);

    expect(res.body.data).toEqual(todos);
  });
});
