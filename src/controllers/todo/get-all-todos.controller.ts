import { Request, Response } from 'express';
import { getAllTodoService } from '../../services/todo/get-all-todos.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const getAllTodoController = async (req: Request, res: Response) => {
  getAllTodoService({
    where: {
      userId: req.user!.userId
    }
  })
    .then((data) => {
      const todos = data.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description
      }))

      return res.status(StatusCode.OK).json({ data: todos });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
