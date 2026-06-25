import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as todoService from '../../../services/todo/delete-todo.service.js';
import * as jwt from '../../../auth/jwt.js';

describe('DELETE /todos/{id} (controller)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const token = jwt.generateAccessToken({
    email: 'john@gmail.com',
    userId: 1,
  });

  it('it should delete a todo', async () => {
    vi.spyOn(todoService, 'deleteTodoService').mockResolvedValue({
      raw: null,
      affected: 1,
    });

    const res = await request(app)
      .delete(`/todos/${1}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCode.NO_CONTENT);

    expect(res.body.data).toEqual(undefined);
  });

  // Id validations
  it('should return 400 if id is not found', async () => {
    vi.spyOn(todoService, 'deleteTodoService').mockRejectedValue({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

    const res = await request(app)
      .delete(`/todos/${1}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCode.NOT_FOUND);

    expect(res.body).toEqual({
      error: {
        message: 'Todo not found',
      },
    });
  });
});
