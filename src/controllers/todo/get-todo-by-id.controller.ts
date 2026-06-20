import { Request, Response } from 'express';
import { getTodoByIdService } from '../../services/todo/get-todo-by-id.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const getTodoController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  getTodoByIdService(+id, req.user!.userId)
    .then((data) => {
      const todo = {
        id: data.id,
        title: data.title,
        description: data.description
      }

      return res.status(StatusCode.OK).json({ data: todo });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
