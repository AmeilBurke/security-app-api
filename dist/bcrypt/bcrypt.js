"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const bcrypt = require('bcrypt');
const encryptPassword = async (unencryptedPassword) => {
    return await bcrypt.hash(unencryptedPassword, 10);
};
exports.encryptPassword = encryptPassword;
//# sourceMappingURL=bcrypt.js.map