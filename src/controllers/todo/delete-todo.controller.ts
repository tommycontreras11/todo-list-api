import { Request, Response } from 'express';
import { deleteTodoService } from '../../services/todo/delete-todo.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const deleteTodoController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  deleteTodoService(+id)
    .then((data) => {
      return res.status(StatusCode.OK).json({ data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
