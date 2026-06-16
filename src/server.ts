import app from "./app";
import config from "./config";
import { initializeDatabase } from "./database/initialize";

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