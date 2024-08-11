import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  database: {
    URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/eventure',
  },
  server: {
    PORT: process.env.PORT || 3000,
  },
  SECRET: '123@#$!@!#1234' || env.SECRET,
  SALT: 10 || (env.SALT && parseInt(env.SALT, 10)),
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret',
  OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID || '0oav5w0c9eY4kE6tO5d6',
  OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET || '0oav5w0c9eY4kE6tO5d6',
  OIDC_REDIRECT_URI:
    process.env.OIDC_REDIRECT_URI ||
    'http://localhost:3000/auth/google/callback',
};
