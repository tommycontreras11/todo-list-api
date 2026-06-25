import { describe, it, expect, vi, afterEach } from 'vitest';
import { todoRepository } from '../../../repositories/todo.repository.js';
import { TodoEntity } from '../../../database/entities/to-do.entity.js';
import { createTodoService } from './../../../services/todo/create-todo.service.js';

describe('createTodoService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  const todo = {
    id: 1,
    title: 'New todo',
    description: 'Description',
    userId: 1,
  };

  // Success Approach
  it('should create a todo', async () => {
  const createSpy = vi.spyOn(todoRepository, 'create')
    .mockResolvedValue(todo as TodoEntity);

  const result = await createTodoService(
    {
      title: 'New todo',
      description: 'Description',
    },
    1,
  );

  expect(result).toEqual(todo);

  expect(createSpy).toHaveBeenCalledWith(
    {
      title: 'New todo',
      description: 'Description',
    },
    1,
  );
});
});
