import dataSource from './../database/data-source.js';
import { TodoEntity } from '../database/entities/to-do.entity.js';
import { CreateOrUpdateTodoDTO } from '../dto/todo/create-or-update-todo.dto.js';
import { FindManyOptions } from 'typeorm';

const repository = dataSource.getRepository(TodoEntity);

export const todoRepository = {
  findAll(options?: FindManyOptions<TodoEntity>) {
    return repository.find(options);
  },
  findById(id: number) {
    return repository.findOne({ where: { id } });
  },
  create(data: CreateOrUpdateTodoDTO, userId: number) {
    const todo = repository.create({
      ...data,
      userId,
    });
    return repository.save(todo);
  },
  update(id: number, data: CreateOrUpdateTodoDTO) {
    return repository
      .update(id, data)
  },
  delete(id: number) {
    return repository.delete({ id });
  },
};
