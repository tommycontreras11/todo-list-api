import { Request, Response } from "express"
import { createUserService } from "../../services/user/create-user.service.js"
import { StatusCode } from "../../constants/status-code.js"

export const createUserController = (req: Request, res: Response) => {
    createUserService(req.body).then((req.body)).then((data) => {
        return res.status(StatusCode.CREATED).json({ token: data })
    })
}