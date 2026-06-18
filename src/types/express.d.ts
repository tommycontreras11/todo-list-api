import { JwtPayload } from "./../auth/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};