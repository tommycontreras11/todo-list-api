import AppDataSource from "./data-source.js";

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();

    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed', error);

    process.exit(1);
  }
};
