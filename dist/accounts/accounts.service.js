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
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
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
                const allVenueIds = await this.prisma.venue.findMany({
                    select: {
                        venue_id: true,
                    },
                });
                if ((await (0, utils_1.isAccountAdminRole)(this.prisma, newAccount)) ||
                    (await (0, utils_1.isAccountSecurityRole)(this.prisma, newAccount))) {
                    allVenueIds.map(async (venueId) => {
                        await this.prisma.venueAccess.create({
                            data: {
                                venueAccess_venueId: venueId.venue_id,
                                venueAccess_accountId: newAccount.account_id,
                            },
                        });
                    });
                }
                if (await (0, utils_1.isAccountVenueManagerRole)(this.prisma, newAccount)) {
                    createAccountDto.account_venueManagerIds.map(async (venueIds) => {
                        await this.prisma.venueAccess.create({
                            data: {
                                venueAccess_venueId: venueIds,
                                venueAccess_accountId: newAccount.account_id,
                            },
                        });
                        await this.prisma.venueManager.create({
                            data: {
                                venueManager_venueId: venueIds,
                                venueManager_accountId: newAccount.account_id,
                            },
                        });
                    });
                }
                return this.prisma.account.findFirstOrThrow({
                    where: {
                        account_id: newAccount.account_id,
                    },
                    include: {
                        VenueAccess: true,
                        VenueManager: true,
                        Role: true,
                    },
                });
            }
            else {
                return (0, utils_1.accountIsUnauthorized)();
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async createSecret(createAccountDto) {
        return await this.prisma.account.create({
            data: {
                account_email: createAccountDto.account_email,
                account_name: createAccountDto.account_name,
                account_password: await (0, bcrypt_1.hashPassword)(createAccountDto.account_password),
                account_roleId: createAccountDto.account_roleId,
            },
        });
    }
    async findAll(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            return this.prisma.account.findMany({
                omit: {
                    account_password: true,
                },
                orderBy: {
                    account_id: 'asc',
                },
                include: {
                    Role: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(request, id) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if ((await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) ||
                requestAccount.account_id === id) {
                return this.prisma.account.findFirstOrThrow({
                    where: {
                        account_id: id,
                    },
                    omit: {
                        account_password: true,
                    },
                    include: {
                        Role: true,
                    },
                });
            }
            else {
                return (0, utils_1.accountIsUnauthorized)();
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
            return (0, utils_1.handleError)(error);
        }
    }
    async update(request, id, updateAccountDto) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if ((await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) ||
                requestAccount.account_id === id) {
                if (updateAccountDto.account_venueAccessIds) {
                    await this.prisma.venueAccess.deleteMany({
                        where: {
                            venueAccess_accountId: id,
                        },
                    });
                    updateAccountDto.account_venueAccessIds.map(async (venueId) => {
                        await this.prisma.venueAccess.create({
                            data: {
                                venueAccess_accountId: id,
                                venueAccess_venueId: venueId,
                            },
                        });
                    });
                }
                if (updateAccountDto.account_venueManagerIds) {
                    await this.prisma.venueManager.deleteMany({
                        where: {
                            venueManager_accountId: id,
                        },
                    });
                    updateAccountDto.account_venueAccessIds.map(async (venueId) => {
                        await this.prisma.venueManager.create({
                            data: {
                                venueManager_accountId: id,
                                venueManager_venueId: venueId,
                            },
                        });
                    });
                }
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
                    include: {
                        VenueAccess: true,
                        VenueManager: true,
                        Role: true,
                    },
                    omit: {
                        account_password: true,
                    },
                });
            }
            else {
                return (0, utils_1.accountIsUnauthorized)();
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(request, id) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return this.prisma.account.delete({
                    where: {
                        account_id: id,
                    },
                });
            }
            else {
                return (0, utils_1.accountIsUnauthorized)();
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