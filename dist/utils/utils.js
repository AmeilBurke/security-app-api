"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecurityRoleFromDB = exports.getFullAccountInfoFromEmail = void 0;
const getFullAccountInfoFromEmail = async (prisma, uploaderEmail) => {
    return await prisma.account.findFirstOrThrow({
        where: {
            account_email: uploaderEmail,
        },
    });
};
exports.getFullAccountInfoFromEmail = getFullAccountInfoFromEmail;
const getSecurityRoleFromDB = async (prisma) => {
    return await prisma.role.findFirstOrThrow({
        where: {
            role_name: 'security',
        },
    });
};
exports.getSecurityRoleFromDB = getSecurityRoleFromDB;
//# sourceMappingURL=utils.js.map