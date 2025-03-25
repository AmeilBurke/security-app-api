"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountVenueManagerRole = exports.isAccountSecurityRole = exports.isAccountAdminRole = exports.getAccountInfoFromId = exports.invalidDayJsDate = exports.accountIsUnauthorized = exports.noFileReceivedError = exports.noRequestAccountError = exports.isPrismaResultError = exports.handleError = void 0;
const library_1 = require("@prisma/client/runtime/library");
const handleError = (error) => {
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        return {
            error_type: 'PrismaClientKnownRequestError',
            error_code: error.code,
            error_message: error.message,
        };
    }
    if (error instanceof library_1.PrismaClientUnknownRequestError) {
        return {
            error_type: 'PrismaClientUnknownRequestError',
            error_code: 'PCURE',
            error_message: error.message,
        };
    }
    console.log(error);
    return {
        error_type: 'UnknownError',
        error_code: '500',
        error_message: 'there was an unexpected error',
    };
};
exports.handleError = handleError;
const isPrismaResultError = (object) => {
    return (typeof object === 'object' &&
        object !== null &&
        typeof object.error_type === 'string' &&
        typeof object.error_code === 'string' &&
        typeof object.error_message === 'string');
};
exports.isPrismaResultError = isPrismaResultError;
const noRequestAccountError = () => {
    return {
        error_type: 'no request account',
        error_code: '400',
        error_message: 'no account details were sent with request',
    };
};
exports.noRequestAccountError = noRequestAccountError;
const noFileReceivedError = () => {
    return {
        error_type: 'no file received',
        error_code: '400',
        error_message: 'no file was sent with request',
    };
};
exports.noFileReceivedError = noFileReceivedError;
const accountIsUnauthorized = () => {
    return {
        error_type: 'account unauthorized',
        error_code: '401',
        error_message: 'the account requesting this does not have the required authorization',
    };
};
exports.accountIsUnauthorized = accountIsUnauthorized;
const invalidDayJsDate = () => {
    return {
        error_type: 'invalid dayjs date',
        error_code: '400',
        error_message: 'the date given could not be converted to a valid dayjs date',
    };
};
exports.invalidDayJsDate = invalidDayJsDate;
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
const isAccountSecurityRole = async (prisma, account) => {
    const role = await prisma.role.findFirstOrThrow({
        where: {
            role_name: 'security',
        },
    });
    if (account.account_roleId === role.role_id) {
        return true;
    }
    else {
        return false;
    }
};
exports.isAccountSecurityRole = isAccountSecurityRole;
const isAccountVenueManagerRole = async (prisma, account) => {
    const role = await prisma.role.findFirstOrThrow({
        where: {
            role_name: 'venue manager',
        },
    });
    if (account.account_roleId === role.role_id) {
        return true;
    }
    else {
        return false;
    }
};
exports.isAccountVenueManagerRole = isAccountVenueManagerRole;
//# sourceMappingURL=index.js.map