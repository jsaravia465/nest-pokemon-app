export const appConfig = () => ({
  port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000,
  host: process.env.HOST || 'localhost',
  environment: process.env.ENVIRONMENT || 'development',
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/pokedex',
  defaultLimit: process.env.DEFAULT_LIMIT ? Number.parseInt(process.env.DEFAULT_LIMIT, 10) : 2,
});