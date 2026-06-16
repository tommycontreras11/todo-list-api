import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

export default {
    PORT: Number(process.env.PORT),
    NODE_ENV: `${process.env.NODE_ENV}`,

    //Database Configuration
    DB_HOST: `${process.env.DB_HOST}`,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: `${process.env.DB_USER}`,
    DB_PASSWORD: `${process.env.DB_PASSWORD}`,
    DB_NAME: `${process.env.DB_NAME}`,
}