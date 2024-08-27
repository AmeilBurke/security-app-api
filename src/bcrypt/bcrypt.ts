const bcrypt = require('bcrypt');

export const encryptPassword = async (unencryptedPassword: string): Promise<string> => {
  return await bcrypt.hash(unencryptedPassword, 10);
};