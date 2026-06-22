import { userRepository } from "../../repositories/user.repository.js"

export const updateUserService = async (id: number, refreshToken: string) => {
    return await userRepository.update(id, refreshToken)
}