import { describe, it, expect, vi, afterEach } from 'vitest';
import { todoRepository } from '../../../repositories/todo.repository.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import { getAllTodoService } from '../../../services/todo/get-all-todos.service.js';

describe('getAllTodoService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Success Approach
  it('should return all todos', async () => {
    const todos = [
      {
        id: 1,
        title: 'New todo',
        description: 'Description',
        userId: 1,
      },
    ] as TodoEntity[];

    const findAllSpy = vi
      .spyOn(todoRepository, 'findAll')
      .mockResolvedValue([todos, 1]);

    const result = await getAllTodoService();

    expect(result).toEqual([todos, 1]);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  // Success Approach
  it('should call repository with filters', async () => {
    const findAllSpy = vi
      .spyOn(todoRepository, 'findAll')
      .mockResolvedValue([[], 0]);

    const options = {
      where: { userId: 1 },
      skip: 0,
      take: 10,
    };

    await getAllTodoService(options);

    expect(findAllSpy).toHaveBeenCalledWith(options);
  });
});
