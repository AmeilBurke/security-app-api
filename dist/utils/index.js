"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = exports.capitalizeString = exports.addJwtCookieToRequest = exports.isAccountVenueManagerRole = exports.isAccountSecurityRole = exports.isAccountAdminRole = exports.getAccountInfoFromId = exports.invalidDayJsDate = exports.accountIsUnauthorized = exports.noFileReceivedError = exports.noRequestAccountError = exports.isPrismaResultError = exports.handleError = void 0;
const library_1 = require("@prisma/client/runtime/library");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
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
const addJwtCookieToRequest = async (response, jwtService, accountId, accountEmail) => {
    const jwt = await jwtService.signAsync({
        sub: accountId,
        email: accountEmail,
    });
    response.cookie('jwt', jwt, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
};
exports.addJwtCookieToRequest = addJwtCookieToRequest;
const capitalizeString = (text) => {
    return text
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
exports.capitalizeString = capitalizeString;
const compressImage = async (imageToCompress, directoryToSaveImage) => {
    const compressedImageBuffer = await (0, sharp_1.default)(imageToCompress.path)
        .toFormat('webp', { quality: 75, effort: 0 })
        .resize(800)
        .toBuffer();
    const fileNameAndExtension = imageToCompress.filename.split('.');
    const filePath = path.join(directoryToSaveImage, `${fileNameAndExtension[0]}.webp`);
    fs.promises.writeFile(filePath, compressedImageBuffer);
    return filePath;
};
exports.compressImage = compressImage;
//# sourceMappingURL=index.js.map