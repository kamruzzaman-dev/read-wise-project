import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_SECRET_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
  },
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
};
