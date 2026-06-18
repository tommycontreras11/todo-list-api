import { Request, Response } from 'express';
import { getAllTodoService } from '../../services/todo/get-all-todos.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const getAllTodoController = async (req: Request, res: Response) => {
  getAllTodoService()
    .then((data) => {
      return res.status(StatusCode.OK).json({ data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
