import { config } from 'dotenv';

config();

const databaseURL = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL || process.env.DEV_DATABASE_URL;

export default {
  databaseURL,
  jwtSecret: process.env.JWT_SECRET,
};
