import { Request, Response } from 'express';
import { updateTodoService } from '../../services/todo/update-todo.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const updateTodoController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  updateTodoService(+id, req.body)
    .then((data) => {
      return res.status(StatusCode.OK).json({ data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
