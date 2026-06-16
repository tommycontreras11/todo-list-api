import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

export default {
    PORT: Number(process.env.PORT),
    NODE_ENV: `${process.env.NODE_ENV}`
}