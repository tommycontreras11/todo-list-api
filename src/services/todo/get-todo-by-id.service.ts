import { todoRepository } from "../../repositories/todo.repository.js";

export const getTodoByIdService = async (id: number) => {
    const todo = await todoRepository.findById(id)
    if(!todo) return Promise.reject({ message: "Todo not found" })

    return todo
}