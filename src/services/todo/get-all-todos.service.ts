import { FindManyOptions } from "typeorm";
import { TodoEntity } from "../../database/entities/to-do.entity.js";
import { todoRepository } from "../../repositories/todo.repository.js";

export const getAllTodoService = async (options?: FindManyOptions<TodoEntity>) => {
    return await todoRepository.findAll(options)
}