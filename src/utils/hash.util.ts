import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

export const hashValue = (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS)
}

export const compareHash = (password: string, passwordHash: string) => {
    return bcrypt.compare(password, passwordHash)
}