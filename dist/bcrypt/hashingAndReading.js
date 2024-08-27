"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPasswordForAccount = void 0;
const bcrypt = require('bcrypt');
const hashPasswordForAccount = async (accountPassword) => {
    return await bcrypt.hash(accountPassword, 10, function (err, hash) {
        return hash;
    });
};
exports.hashPasswordForAccount = hashPasswordForAccount;
//# sourceMappingURL=hashingAndReading.js.map