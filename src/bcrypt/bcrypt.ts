const bcrypt = require('bcrypt');
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export const hashPassword = async (
  unencryptedPassword: string,
): Promise<string> => {
  return await bcrypt.hash(unencryptedPassword, 10);
};

const deriveKey = async (secret: string): Promise<Buffer> => {
  return (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
};

// postman request succeeds but not from frontend

// export const encryptString = async (stringToEncrypt: string) => {
//   const key = await deriveKey();
//   const iv = randomBytes(16);

//   const cipher = createCipheriv('aes-256-ctr', key, iv);
//   const encryptedData = Buffer.concat([
//     cipher.update(stringToEncrypt),
//     cipher.final(),
//   ]);
//   return Buffer.concat([iv, encryptedData]).toString('base64');
// };

export const encryptString = async (
  stringToEncrypt: string,
): Promise<string> => {
  const iv = randomBytes(16); // Generate a random IV
  const key = await deriveKey(process.env.ENCRYPTION_SECRET); // Derive the key

  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedData = Buffer.concat([
    cipher.update(stringToEncrypt),
    cipher.final(),
  ]);

  // Combine IV and encrypted data into a single payload
  return Buffer.concat([iv, encryptedData]).toString('base64');
};

// export const decryptString = async (
//   stringToDecrypt: NodeJS.ArrayBufferView,
// ) => {
//   const iv = randomBytes(16);
//   const key = (await promisify(scrypt)(
//     process.env.ENCRYPTION_SECRET,
//     'salt',
//     32,
//   )) as Buffer;
//   const decipher = createDecipheriv('aes-256-ctr', key, iv);
//   const decryptedText = Buffer.concat([
//     decipher.update(stringToDecrypt),
//     decipher.final(),
//   ]);
// };

export const decryptString = async (
  stringToDecrypt: string,
): Promise<string> => {
  const encryptedBuffer = Buffer.from(stringToDecrypt, 'base64'); // Decode Base64 string to Buffer

  // Extract IV and encrypted data
  const iv = encryptedBuffer.subarray(0, 16);
  const encryptedData = encryptedBuffer.subarray(16);

  const key = await deriveKey(process.env.ENCRYPTION_SECRET!); // Derive the key

  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);

  return decryptedText.toString('utf8');
};
