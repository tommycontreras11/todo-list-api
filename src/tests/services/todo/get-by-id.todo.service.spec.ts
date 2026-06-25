import { describe, it, expect, vi, afterEach } from 'vitest';
import { todoRepository } from '../../../repositories/todo.repository.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import { getTodoByIdService } from '../../../services/todo/get-todo-by-id.service.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as authorization from '../../../services/auth/authorization.js';

describe('getTodoByIdService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const todo = {
    id: 1,
    title: 'New todo',
    description: 'Description',
    userId: 1,
  } as TodoEntity;

  // Success Approach
  it('should return a todo by id', async () => {
    const findByIdSpy = vi
      .spyOn(todoRepository, 'findById')
      .mockResolvedValue(todo);

    const assertOwnershipSpy = vi
      .spyOn(authorization, 'assertOwnership')
      .mockImplementation(() => {});

    const result = await getTodoByIdService(1, 1);

    expect(result).toEqual(todo);

    expect(findByIdSpy).toHaveBeenCalledWith(1);

    expect(assertOwnershipSpy).toHaveBeenCalledWith(1, 1);
  });

  // Fail Approaches
  it('should reject when the user is not found', async () => {
    vi.spyOn(todoRepository, 'findById').mockResolvedValue(null);

    const assertOwnershipSpy = vi.spyOn(authorization, 'assertOwnership');

    await expect(getTodoByIdService(1, 1)).rejects.toEqual({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

    expect(assertOwnershipSpy).not.toHaveBeenCalled();
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

    await expect(getTodoByIdService(1, 1)).rejects.toEqual({
      message: 'Forbidden',
      status: StatusCode.FORBIDDEN,
    });
  });
});
