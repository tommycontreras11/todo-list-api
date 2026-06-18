import { Request, Response } from 'express';
import { getTodoByIdService } from '../../services/todo/get-todo-by-id.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const getTodoController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  getTodoByIdService(+id)
    .then((data) => {
      return res.status(StatusCode.OK).json({ data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
