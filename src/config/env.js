import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dynamic-portfolio',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'default_jwt_access_secret_key_change_in_prod',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret_key_change_in_prod',
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  EMAIL_PORT: process.env.EMAIL_PORT || 2525,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
};
