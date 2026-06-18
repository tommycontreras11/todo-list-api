import { Request, Response } from 'express';
import { createTodoService } from '../../services/todo/create-todo.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const createTodoController = async (req: Request, res: Response) => {
  createTodoService(req.body, req.user?.userId!)
    .then((data) => {
      return res.status(StatusCode.CREATED).json({ data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
