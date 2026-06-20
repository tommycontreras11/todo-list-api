import { StatusCode } from '../../constants/status-code.js';
import { CreateOrUpdateTodoDTO } from '../../dto/todo/create-or-update-todo.dto.js';
import { todoRepository } from '../../repositories/todo.repository.js';
import { assertOwnership } from '../auth/authorization.js';

export const updateTodoService = async (
  id: number,
  data: CreateOrUpdateTodoDTO,
  userId: number,
) => {
  const todo = await todoRepository.findById(id);
  if (!todo)
    return Promise.reject({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

  assertOwnership(todo.userId, userId);

  await todoRepository.update(id, data);

  return await todoRepository.findById(id);
};
