import "reflect-metadata"

import app from "./app.js";
import { initializeDatabase } from "./database/initialize.js";
import config from "./config/index.js";

async function bootstrap() {
  try {
    await initializeDatabase();

    app.listen(config.PORT, () => {
      console.log(`The server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start application", error);
    process.exit(1);
  }
}

bootstrap();