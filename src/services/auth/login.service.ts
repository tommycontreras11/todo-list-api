import { generateAccessToken, generateRefreshToken } from "../../auth/jwt.js";
import { StatusCode } from "../../constants/status-code.js";
import { LoginDTO } from "../../dto/auth/login.dto.js";
import { userRepository } from "../../repositories/user.repository.js";
import { compareHash, hashValue } from "../../utils/hash.util.js";
import { updateUserService } from "../user/update.service.js";

export const loginService = async({ email, password }: LoginDTO) => {
    const user = await userRepository.findByEmail(email)

    if(!user) return Promise.reject({ message: "User y/o password incorrect", status: StatusCode.BAD_REQUEST })

    const validatePassword = await compareHash(password, user.password)

    if(!validatePassword) return Promise.reject({ message: "User y/o password incorrect", status: StatusCode.BAD_REQUEST })

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    const hashToken = await hashValue(refreshToken)

    await updateUserService(user.id, hashToken)
    
    return {
      accessToken,
      refreshToken,
    };
}