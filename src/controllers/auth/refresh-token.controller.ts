import { Request, Response } from 'express';
import { StatusCode } from '../../constants/status-code.js';
import { refreshTokenService } from '../../services/auth/refresh-token.service.js';

export const refreshTokenController = async (req: Request, res: Response) => {
  refreshTokenService(req.body)
    .then((data) => {
      return res.status(StatusCode.OK).json({ token: data });
    })
    .catch((e) => {
      return res
        .status(e.status ?? StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
