import * as dotenv from 'dotenv';

dotenv.config();

export const environmentConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  PORT: process.env.PORT ? process.env.PORT : 3002,
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret123',
  MONGOOSE_URL: process.env.MONGOOSE_URL ? `${process.env.MONGOOSE_URL}` : "",
  EMAIL_ID: process.env.EMAIL_ID ? process.env.EMAIL_ID : "",
  password: process.env.PASSWORD ? process.env.PASSWORD : "",
});
