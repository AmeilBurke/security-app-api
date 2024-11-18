"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountAdminRole = exports.getAccountInfoFromId = exports.handleError = void 0;
const library_1 = require("@prisma/client/runtime/library");
const handleError = (error) => {
    console.log(error);
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            return `${error.meta.target[0]} has failed the unique constraint requirement`;
        }
    }
    return String(error);
};
exports.handleError = handleError;
const getAccountInfoFromId = async (prisma, id) => {
    try {
        return await prisma.account.findFirstOrThrow({
            where: {
                account_id: id,
            },
        });
    }
    catch (error) {
        return (0, exports.handleError)(error);
    }
};
exports.getAccountInfoFromId = getAccountInfoFromId;
const isAccountAdminRole = async (prisma, account) => {
    const role = await prisma.role.findFirstOrThrow({
        where: {
            role_name: 'admin',
        },
    });
    if (account.account_roleId === role.role_id) {
        return true;
    }
    else {
        return false;
    }
};
exports.isAccountAdminRole = isAccountAdminRole;
//# sourceMappingURL=index.js.map