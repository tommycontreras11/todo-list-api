import { Request, Response, Router } from "express";
import { StatusCode } from "../../constants/status-code.js";
import { validateDto } from "../../middlewares/dto-validator.middleware.js";
import { CreateUserDTO } from "../../dto/auth/register.dto.js";
import { createUserController, loginController } from "../../controllers/auth/index.js";
import { LoginDTO } from "../../dto/auth/login.dto.js";

const router = Router()

router.get("/health", (_req: Request, res: Response) => {
    res.status(StatusCode.OK).json({ healthy: true })
})

router.post("/register", validateDto(CreateUserDTO), createUserController)
router.post("/login", validateDto(LoginDTO), loginController)

export default router