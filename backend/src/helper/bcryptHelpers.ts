import bcrypt from 'bcrypt';
import config from '../config';

// Function to hash the password
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

export const bcryptHelpers = {
  hashPassword,
};
