import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../constants/status-code.js';
import { verifyAccessToken } from '../auth/jwt.js';

const blackListedTokens: string[] = [];

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer '))
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  if (blackListedTokens.includes(token))
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Invalid Access Token' });

  if (req.url === '/refresh-token') {
    blackListedTokens.push(token);
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Invalid Access Token' });
  }
}
