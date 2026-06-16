import { DataSource } from "typeorm";
import config from "../config"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: false,
    logging: config.NODE_ENV === "dev",
    entities: [],
    migrations: []
})