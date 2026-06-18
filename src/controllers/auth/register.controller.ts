import { Request, Response } from 'express';
import { registerUserService } from '../../services/auth/register.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const createUserController = (req: Request, res: Response) => {
  registerUserService(req.body)
    .then(req.body)
    .then((data) => {
      return res.status(StatusCode.CREATED).json({ token: data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: e.message });
    });
};
