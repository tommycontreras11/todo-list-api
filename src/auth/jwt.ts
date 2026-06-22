import jwt from "jsonwebtoken"
import config from "../config/index.js"

export interface JwtPayload {
    userId: number
    email: string
    iat?: number
    exp?: number
}

export const generateAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "15m",
    })
}

export const generateRefreshToken = (payload: JwtPayload) => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
}

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.JWT_SECRET) as JwtPayload
}

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload
}