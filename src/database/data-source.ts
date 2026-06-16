import { DataSource } from "typeorm";
import config from "./../config/index.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: false,
    logging: config.NODE_ENV === "dev",
    entities: [
        path.join(__dirname, "entities/*.entity.{ts,js}")
    ],
    migrations: [
        path.join(__dirname, "migrations/*.{ts,js}")
    ]
})

export default AppDataSource