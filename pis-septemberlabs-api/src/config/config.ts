import dotEnv = require("dotenv");
dotEnv.config();

export default {
  APP: process.env.APP,
  ADMIN: process.env.ADMIN,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  DB_DIALECT: process.env.DB_DIALECT,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  GOOGLE_ADMIN_CALLBACK_URL: process.env.GOOGLE_ADMIN_CALLBACK_URL,

  GMAIL_USER_INVITE_SENDER: process.env.GMAIL_USER_INVITE_SENDER,
  GMAIL_PWD_INVITE_SENDER: process.env.GMAIL_PWD_INVITE_SENDER,

  COOKIE_SESSION_KEY: process.env.COOKIE_SESSION_KEY,
};
