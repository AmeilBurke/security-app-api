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
const bcrypt_1 = require("../bcrypt/bcrypt");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createAccountDto) {
        if (!request.account.sub) {
            return (0, utils_1.noRequestAccountError)();
        }
        const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
        if ((0, utils_1.isPrismaResultError)(requestAccount)) {
            return requestAccount;
        }
        if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
            return (0, utils_1.accountIsUnauthorized)();
        }
        const newAccount = await this.prisma.account.create({
            data: {
                email: createAccountDto.email.toLocaleLowerCase().trim(),
                name: createAccountDto.name.toLocaleLowerCase().trim(),
                password: await (0, bcrypt_1.hashPassword)(createAccountDto.password),
                role: { connect: { id: createAccountDto.roleId } },
            },
        });
        const allVenueIds = await this.prisma.venue.findMany({
            select: {
                id: true,
            },
        });
        if (await (0, utils_1.isAccountVenueManagerRole)(this.prisma, newAccount)) {
            createAccountDto.managesVenueIds.map(async (venueIds) => {
                await this.prisma.venueAccess.create({
                    data: {
                        venueId: venueIds,
                        accountId: newAccount.id,
                    },
                });
                await this.prisma.venueManager.create({
                    data: {
                        venueId: venueIds,
                        accountId: newAccount.id,
                    },
                });
            });
        }
        if ((await (0, utils_1.isAccountAdminRole)(this.prisma, newAccount)) ||
            (await (0, utils_1.isAccountSecurityRole)(this.prisma, newAccount))) {
            allVenueIds.map(async (venueId) => {
                await this.prisma.venueAccess.create({
                    data: {
                        venueId: venueId.id,
                        accountId: newAccount.id,
                    },
                });
            });
        }
        try {
            return this.prisma.account.findFirstOrThrow({
                where: {
                    id: newAccount.id,
                },
                include: {
                    role: true,
                    accesses: true,
                    manages: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.prisma.account.findFirstOrThrow({
                where: {
                    email: {
                        equals: email,
                        mode: "insensitive",
                    },
                },
                include: {
                    role: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async createSecret(createAccountDto) {
        return await this.prisma.account.create({
            data: {
                email: createAccountDto.email,
                name: createAccountDto.name,
                password: await (0, bcrypt_1.hashPassword)(createAccountDto.password),
                role: { connect: { id: createAccountDto.roleId } },
            },
        });
    }
    async findAll(request) {
        try {
            if (!request.account.sub) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            return this.prisma.account.findMany({
                omit: {
                    password: true,
                    roleId: true,
                },
                orderBy: {
                    name: "asc",
                },
                include: {
                    role: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(request, id) {
        if (!request.account.sub) {
            return (0, utils_1.noRequestAccountError)();
        }
        const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
        if ((0, utils_1.isPrismaResultError)(requestAccount)) {
            return requestAccount;
        }
        if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) &&
            requestAccount.id !== id) {
            return (0, utils_1.accountIsUnauthorized)();
        }
        try {
            return await this.prisma.account.findFirstOrThrow({
                where: {
                    id: id,
                },
                omit: {
                    password: true,
                    roleId: true,
                },
                include: {
                    role: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(request, id, updateAccountDto) {
        if (!request.account.sub) {
            return (0, utils_1.noRequestAccountError)();
        }
        const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
        if ((0, utils_1.isPrismaResultError)(requestAccount)) {
            return requestAccount;
        }
        if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) &&
            requestAccount.id !== id) {
            return (0, utils_1.accountIsUnauthorized)();
        }
        try {
            await this.prisma.account.update({
                where: {
                    id: id,
                },
                data: {
                    email: updateAccountDto.email
                        ? updateAccountDto.email.toLocaleLowerCase().trim()
                        : updateAccountDto.email,
                    name: updateAccountDto.name
                        ? updateAccountDto.name.toLocaleLowerCase().trim()
                        : updateAccountDto.name,
                    password: updateAccountDto.password
                        ? await (0, bcrypt_1.hashPassword)(updateAccountDto.password)
                        : updateAccountDto.password,
                    roleId: updateAccountDto.roleId,
                },
            });
            if (updateAccountDto.managesVenueIds) {
                await this.prisma.venueManager.deleteMany({
                    where: {
                        accountId: id,
                    },
                });
                await this.prisma.venueManager.createMany({
                    data: updateAccountDto.managesVenueIds.map((venueId) => {
                        return { accountId: id, venueId };
                    }),
                });
            }
            return await this.prisma.account.findFirstOrThrow({
                where: {
                    id: id,
                },
                omit: {
                    password: true,
                    roleId: true,
                },
                include: {
                    role: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(request, id) {
        if (!request.account.sub) {
            return (0, utils_1.noRequestAccountError)();
        }
        const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
        if ((0, utils_1.isPrismaResultError)(requestAccount)) {
            return requestAccount;
        }
        if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
            return (0, utils_1.accountIsUnauthorized)();
        }
        try {
            await this.prisma.venueAccess.deleteMany({
                where: {
                    accountId: id,
                },
            });
            await this.prisma.venueManager.deleteMany({
                where: {
                    accountId: id,
                },
            });
            await this.prisma.alertDetail.updateMany({
                where: {
                    uploadedById: id,
                },
                data: {
                    uploadedById: requestAccount.id,
                },
            });
            await this.prisma.banDetail.updateMany({
                where: {
                    uploadedById: id,
                },
                data: {
                    uploadedById: requestAccount.id,
                },
            });
            const deletedAccount = await this.prisma.account.delete({
                where: {
                    id: id,
                },
            });
            return `account deleted: ${deletedAccount.name}`;
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