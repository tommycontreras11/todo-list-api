import { NextFunction, Request, Response } from "express";
import { getTodoByIdService } from "../services/todo/get-todo-by-id.service.js";
import { StatusCode } from "../constants/status-code.js";

export async function ownershipTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string }

    const todo = await getTodoByIdService(+id)

    if(todo.user.id != req.user?.userId) return res.status(StatusCode.FORBIDDEN).json({ message: "Forbidden" })

    next()
}