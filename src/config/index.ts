import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

function required(name: string): string {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

const config = {
    PORT: Number(required("PORT")),
    NODE_ENV: required("NODE_ENV"),

    //Database Configuration
    DB_HOST: required("DB_HOST"),
    DB_PORT: Number(required("DB_PORT")),
    DB_USER: required("DB_USER"),
    DB_PASSWORD: required("DB_PASSWORD"),
    DB_NAME: required("DB_NAME"),

    //Authentication Configuration
    JWT_SECRET: required("JWT_SECRET"),
    JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET")    
}

export default config