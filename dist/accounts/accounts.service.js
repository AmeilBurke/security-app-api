"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("../bcrypt/bcrypt");
const utils_1 = require("../utils");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createAccountDto) {
        try {
            if (!request.account) {
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                createAccountDto.account_password = await (0, bcrypt_1.hashPassword)(createAccountDto.account_password);
                const newAccount = await this.prisma.account.create({
                    data: {
                        account_name: createAccountDto.account_name
                            .toLocaleLowerCase()
                            .trim(),
                        account_email: createAccountDto.account_email
                            .toLocaleLowerCase()
                            .trim(),
                        account_password: createAccountDto.account_password,
                        account_roleId: createAccountDto.account_roleId,
                    },
                });
                if (createAccountDto.account_venueAccessIds) {
                    createAccountDto.account_venueAccessIds.map(async (venueId) => {
                        try {
                            await this.prisma.venueAccess.create({
                                data: {
                                    venueAccess_accountId: newAccount.account_id,
                                    venueAccess_venueId: venueId,
                                },
                            });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                }
                if (createAccountDto.account_venueManagerIds) {
                    createAccountDto.account_venueManagerIds.map(async (venueId) => {
                        try {
                            await this.prisma.venueManager.create({
                                data: {
                                    venueManager_accountId: newAccount.account_id,
                                    venueManager_venueId: venueId,
                                },
                            });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                }
                return this.prisma.account.findFirstOrThrow({
                    where: {
                        account_id: newAccount.account_id,
                    },
                    include: {
                        VenueAccess: true,
                        VenueManager: true,
                    },
                });
            }
            else {
                return 'you do not have permission to access this';
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAll(request) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return this.prisma.account.findMany({
                    orderBy: {
                        account_id: 'asc',
                    },
                    select: {
                        account_id: true,
                        account_email: true,
                        account_name: true,
                        account_roleId: true,
                    },
                });
            }
            else {
                return 'you do not have permission to access this';
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(request, id) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return this.prisma.account.findFirstOrThrow({
                    where: {
                        account_id: id,
                    },
                });
            }
            else {
                return 'you do not have permission to access this';
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.prisma.account.findFirstOrThrow({
                where: {
                    account_email: email,
                },
            });
        }
        catch (error) {
            return 'error, this needs completing';
        }
    }
    async update(request, id, updateAccountDto) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if ((await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) ||
                requestAccount.account_id === id) {
                return this.prisma.account.update({
                    where: {
                        account_id: id,
                    },
                    data: {
                        account_name: updateAccountDto.account_name
                            ? updateAccountDto.account_name.toLocaleLowerCase().trim()
                            : updateAccountDto.account_name,
                        account_email: updateAccountDto.account_email
                            ? updateAccountDto.account_email.toLocaleLowerCase().trim()
                            : updateAccountDto.account_email,
                        account_password: updateAccountDto.account_password
                            ? await (0, bcrypt_1.hashPassword)(updateAccountDto.account_password)
                            : updateAccountDto.account_password,
                        account_roleId: updateAccountDto.account_roleId,
                    },
                });
            }
            else {
                return 'you do not have permission to access this';
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(request, id) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return this.prisma.account.delete({
                    where: {
                        account_id: id,
                    },
                });
            }
            else {
                return 'you do not have permission to access this';
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map