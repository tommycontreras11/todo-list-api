import { generateAccessToken, verifyRefreshToken } from "../../auth/jwt.js"
import { StatusCode } from "../../constants/status-code.js"
import { RefreshTokenDTO } from "../../dto/auth/refresh-token.dto.js"
import { userRepository } from "../../repositories/user.repository.js"
import { compareHash } from "../../utils/hash.util.js"

export const refreshTokenService = async ({refreshToken }: RefreshTokenDTO) => {
    const payload = verifyRefreshToken(refreshToken)

    const user = await userRepository.findByEmail(payload.email)

    if(!user) return Promise.reject({
        message: "User not found",
        status: StatusCode.NOT_FOUND
    })

    const compareToken = await compareHash(refreshToken, user.refreshTokenHash)

    if(!compareToken) return Promise.reject({
        message: "Invalid refresh token",
        status: StatusCode.UNAUTHORIZED
    })

    return generateAccessToken({ userId: user.id, email: user.email })
}