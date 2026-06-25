import { describe, it, expect, vi, afterEach } from 'vitest';
import { todoRepository } from '../../../repositories/todo.repository.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import * as authorization from '../../../services/auth/authorization.js';
import { deleteTodoService } from '../../../services/todo/delete-todo.service.js';
import { StatusCode } from '../../../constants/status-code.js';

describe('deleteTodoService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const todo = {
    id: 1,
    title: 'New todo',
    description: 'Description',
    userId: 1,
  };

  // Success approach
  it('should delete a todo', async () => {
    const createSpy = vi.spyOn(todoRepository, 'delete').mockResolvedValue({
      raw: null,
      affected: 1,
    });

    vi.spyOn(todoRepository, 'findById').mockResolvedValue({
      ...todo,
    } as TodoEntity);

    vi.spyOn(authorization, 'assertOwnership').mockResolvedValue();

    const result = await deleteTodoService(1, 1);

    expect(result).toEqual({
      raw: null,
      affected: 1,
    });

    expect(createSpy).toHaveBeenCalledWith(1);
  });

  // Fail approaches
  it('should reject when todo does not exist', async () => {
    vi.spyOn(todoRepository, 'findById').mockResolvedValue(null);

    const deleteSpy = vi.spyOn(todoRepository, 'delete');

    await expect(deleteTodoService(1, 1)).rejects.toEqual({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('should reject when user is not the owner', async () => {
    vi.spyOn(todoRepository, 'findById').mockResolvedValue({
      ...todo,
    } as TodoEntity);

    vi.spyOn(authorization, 'assertOwnership').mockImplementation(() => {
      throw {
        message: 'Forbidden',
        status: StatusCode.FORBIDDEN,
      };
    });

    const deleteSpy = vi.spyOn(todoRepository, 'delete');

    await expect(deleteTodoService(1, 1)).rejects.toEqual({
      message: 'Forbidden',
      status: StatusCode.FORBIDDEN,
    });

    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
