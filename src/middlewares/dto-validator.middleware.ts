import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../constants/status-code.js";

export function validateDto<T extends object>(DtoClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(DtoClass, req.body)

        const errors = await validate(dto, {
            whitelist: true,
            forbidNonWhitelisted: true
        })

        if(errors.length > 0) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "Validation failed",
                errors: errors.map((error) => ({
                    field: error.property,
                    constraints: Object.values(error.constraints ?? {})
                }))
            })
        }

        req.body = dto

        next()
    }
}