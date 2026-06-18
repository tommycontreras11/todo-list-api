import { generateAccessToken } from "../../auth/jwt.js";
import { LoginDTO } from "../../dto/auth/login.dto.js";
import { userRepository } from "../../repositories/user.repository.js";
import { comparePassword } from "../../utils/password.util.js";

export const loginService = async({ email, password }: LoginDTO) => {
    const user = await userRepository.findByEmail(email)

    if(!user) return Promise.reject({ message: "User y/o password incorrect" })

    const validatePassword = await comparePassword(password, user.password)

    if(!validatePassword) return Promise.reject({ message: "User y/o password incorrect" })

    return generateAccessToken({ userId: user.id, email })
}