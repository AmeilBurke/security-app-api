"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptString = exports.encryptString = exports.hashPassword = void 0;
const bcrypt = require('bcrypt');
const crypto_1 = require("crypto");
const util_1 = require("util");
const hashPassword = async (unencryptedPassword) => {
    return await bcrypt.hash(unencryptedPassword, 10);
};
exports.hashPassword = hashPassword;
const deriveKey = async (secret) => {
    return (await (0, util_1.promisify)(crypto_1.scrypt)(secret, 'salt', 32));
};
const encryptString = async (stringToEncrypt) => {
    const iv = (0, crypto_1.randomBytes)(16);
    const key = await deriveKey(process.env.ENCRYPTION_SECRET);
    const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
    const encryptedData = Buffer.concat([
        cipher.update(stringToEncrypt),
        cipher.final(),
    ]);
    return Buffer.concat([iv, encryptedData]).toString('base64');
};
exports.encryptString = encryptString;
const decryptString = async (stringToDecrypt) => {
    const encryptedBuffer = Buffer.from(stringToDecrypt, 'base64');
    const iv = encryptedBuffer.subarray(0, 16);
    const encryptedData = encryptedBuffer.subarray(16);
    const key = await deriveKey(process.env.ENCRYPTION_SECRET);
    const decipher = (0, crypto_1.createDecipheriv)('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final(),
    ]);
    return decryptedText.toString('utf8');
};
exports.decryptString = decryptString;
//# sourceMappingURL=bcrypt.js.map