import { describe, it, expect, vi, afterEach } from 'vitest';
import { todoRepository } from '../../../repositories/todo.repository.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import { updateTodoService } from '../../../services/todo/update-todo.service.js';
import { StatusCode } from '../../../constants/status-code.js';
import * as authorization from '../../../services/auth/authorization.js';

describe('updateTodoService', () => {
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
  it('should update and return a todo', async () => {
    const findByIdSpy = vi
      .spyOn(todoRepository, 'findById')
      .mockResolvedValueOnce(todo) // first call (exist check)
      .mockResolvedValueOnce({ ...todo, title: 'Updated' } as TodoEntity); // second call (return updated)

    const updateSpy = vi
      .spyOn(todoRepository, 'update')
      .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });

    const assertOwnershipSpy = vi.spyOn(authorization, 'assertOwnership');

    const result = await updateTodoService(
      1,
      { title: 'Updated', description: 'Description' },
      1,
    );

    expect(result).toEqual({
      ...todo,
      title: 'Updated',
    });

    expect(findByIdSpy).toHaveBeenCalledTimes(2);

    expect(updateSpy).toHaveBeenCalledWith(1, {
      title: 'Updated',
      description: 'Description',
    });

    expect(assertOwnershipSpy).toHaveBeenCalledWith(1, 1);
  });

  // Fail Approaches
  it('should reject when todo is not found', async () => {
    vi.spyOn(todoRepository, 'findById').mockResolvedValue(null);

    const updateSpy = vi.spyOn(todoRepository, 'update');

    const assertOwnershipSpy = vi.spyOn(authorization, 'assertOwnership');

    await expect(
      updateTodoService(
        1,
        { title: 'Updated', description: 'Description' },
        1,
      ),
    ).rejects.toEqual({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

    expect(updateSpy).not.toHaveBeenCalled();
    expect(assertOwnershipSpy).not.toHaveBeenCalled();
  });

  it('should reject when user is not the owner', async () => {
    vi.spyOn(todoRepository, 'findById').mockResolvedValue({
      ...todo
    } as TodoEntity);

    vi.spyOn(authorization, 'assertOwnership').mockImplementation(() => {
      throw {
        message: 'Forbidden',
        status: StatusCode.FORBIDDEN,
      };
    });

    const updateSpy = vi.spyOn(todoRepository, 'update');

    await expect(
      updateTodoService(
        1,
        { title: 'Updated', description: 'Description' },
        1,
      ),
    ).rejects.toEqual({
      message: 'Forbidden',
      status: StatusCode.FORBIDDEN,
    });

    expect(updateSpy).not.toHaveBeenCalled();
  });
});