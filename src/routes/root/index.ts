import { Request, Response, Router } from "express";
import { StatusCode } from "../../constants/status-code.js";
import { validateDto } from "../../middlewares/dto-validator.middleware.js";
import { CreateUserDTO } from "../../dto/auth/register.dto.js";
import { createUserController, loginController, refreshTokenController } from "../../controllers/auth/index.js";
import { LoginDTO } from "../../dto/auth/login.dto.js";
import todoRoutes from "./../todo/index.js"
import { apiRateLimiter, authRateLimiter } from "../../config/rate-limit.js";
import { RefreshTokenDTO } from "../../dto/auth/refresh-token.dto.js";
import { validateToken } from "../../middlewares/auth.middleware.js";

const router = Router()

router.get("/health", (_req: Request, res: Response) => {
    res.status(StatusCode.OK).json({ healthy: true })
})

router.post("/register", authRateLimiter, validateDto(CreateUserDTO), createUserController)
router.post("/refresh-token", authRateLimiter, validateToken, validateDto(RefreshTokenDTO), refreshTokenController)
router.post("/login", authRateLimiter, validateDto(LoginDTO), loginController)

router.use("/todos", apiRateLimiter, todoRoutes)

export default router