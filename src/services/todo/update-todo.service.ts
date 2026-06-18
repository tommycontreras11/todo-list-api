import { CreateOrUpdateTodoDTO } from "../../dto/todo/create-or-update-todo.dto.js";
import { todoRepository } from "../../repositories/todo.repository.js";

export const updateTodoService = async (id: number, data: CreateOrUpdateTodoDTO) => {
    const todo = await todoRepository.findById(id)
    if(!todo) return Promise.reject({ message: "Todo not found" })
    
    if(Object.values(data).length === 0) return 

    return await todoRepository.update(id, data)
}