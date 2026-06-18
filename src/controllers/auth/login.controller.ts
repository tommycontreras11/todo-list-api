import { Request, Response } from 'express';
import { loginService } from '../../services/auth/login.service.js';
import { StatusCode } from '../../constants/status-code.js';

export const loginController = async (req: Request, res: Response) => {
  loginService(req.body)
    .then((data) => {
      return res.status(StatusCode.OK).json({ token: data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: e.message });
    });
};
