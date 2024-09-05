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
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("../bcrypt/bcrypt");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createAccountDto) {
        try {
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                createAccountDto.account_password = await (0, bcrypt_1.encryptPassword)(createAccountDto.account_password);
                return await this.prisma.account.create({
                    data: {
                        account_email: createAccountDto.account_email
                            .toLocaleLowerCase()
                            .trim(),
                        account_name: createAccountDto.account_name
                            .toLocaleLowerCase()
                            .trim(),
                        account_password: createAccountDto.account_password,
                        account_roleId: createAccountDto.account_roleId,
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
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                return await this.prisma.account.findMany({
                    orderBy: {
                        account_id: 'asc',
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
    async findOne(id, request) {
        try {
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            console.log(request.account);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                return await this.prisma.account.findFirstOrThrow({
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
    async findOneToSignIn(email) {
        try {
            return await this.prisma.account.findFirstOrThrow({
                where: {
                    account_email: email,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(id, request, updateAccountDto) {
        try {
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                if (updateAccountDto.account_password) {
                    updateAccountDto.account_password = await (0, bcrypt_1.encryptPassword)(updateAccountDto.account_password);
                }
                return await this.prisma.account.update({
                    where: {
                        account_id: id,
                    },
                    data: {
                        account_email: updateAccountDto.account_email
                            ? updateAccountDto.account_email.toLocaleLowerCase().trim()
                            : updateAccountDto.account_email,
                        account_name: updateAccountDto.account_name
                            ? updateAccountDto.account_name.toLocaleLowerCase().trim()
                            : updateAccountDto.account_name,
                        account_password: updateAccountDto.account_password,
                        account_roleId: updateAccountDto.account_roleId,
                    },
                });
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(id, request) {
        const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
        if (uploaderAccount === undefined) {
            return 'uploaderAccount is undefined';
        }
        const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
        if (uploaderAccount.account_roleId === adminRole.role_id) {
            return await this.prisma.account.delete({
                where: {
                    account_id: id,
                },
            });
        }
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map