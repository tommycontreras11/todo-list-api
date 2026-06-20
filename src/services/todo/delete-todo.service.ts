import { StatusCode } from '../../constants/status-code.js';
import { todoRepository } from '../../repositories/todo.repository.js';
import { assertOwnership } from '../auth/authorization.js';

export const deleteTodoService = async (id: number, userId: number) => {
  const todo = await todoRepository.findById(id);
  if (!todo)
    return Promise.reject({
      message: 'Todo not found',
      status: StatusCode.NOT_FOUND,
    });

  assertOwnership(todo.userId, userId);

  return todoRepository.delete(id);
};
