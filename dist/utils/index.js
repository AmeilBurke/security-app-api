"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.getAccountWithEmail = exports.getRoleFromDB = void 0;
const library_1 = require("@prisma/client/runtime/library");
const getRoleFromDB = async (prisma, roleName) => {
    return await prisma.role.findFirstOrThrow({
        where: {
            role_name: roleName,
        },
    });
};
exports.getRoleFromDB = getRoleFromDB;
const getAccountWithEmail = async (prisma, email) => {
    try {
        return await prisma.account.findFirstOrThrow({
            where: {
                account_email: email,
            },
        });
    }
    catch (error) {
        (0, exports.handleError)(error);
    }
};
exports.getAccountWithEmail = getAccountWithEmail;
const handleError = (error) => {
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            return 'you cannot use the same email for multiple accounts';
        }
        if (error.code === 'P2003') {
            return `there was an error with one or more foreign keys`;
        }
        if (error.code === 'P2025') {
            return 'not found error';
        }
        return error.message;
    }
    if (error instanceof library_1.PrismaClientUnknownRequestError) {
        return error.message;
    }
    return String(error);
};
exports.handleError = handleError;
//# sourceMappingURL=index.js.map