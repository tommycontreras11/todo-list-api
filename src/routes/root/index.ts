import { Request, Response, Router } from "express";
import { StatusCode } from "../../constants/status-code.js";

const router = Router()

router.get("/health", (_req: Request, res: Response) => {
    res.status(StatusCode.OK).json({ healthy: true })
})

export default router