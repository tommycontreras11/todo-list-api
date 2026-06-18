import { CreateOrUpdateTodoDTO } from "../../dto/todo/create-or-update-todo.dto.js";
import { todoRepository } from "../../repositories/todo.repository.js";

export const createTodoService = async (data: CreateOrUpdateTodoDTO, userId: number) => {
    return await todoRepository.create(data, userId)
}