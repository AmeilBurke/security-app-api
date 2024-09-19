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
exports.BusinessesService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
let BusinessesService = class BusinessesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, createBusinessDto) {
        try {
            if (file === undefined) {
                createBusinessDto.business_logo = 'undefined';
            }
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                return await this.prisma.business.create({
                    data: {
                        business_name: createBusinessDto.business_name,
                        business_logo: file.filename,
                    },
                });
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllByAccess(request) {
        try {
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                return await this.prisma.business.findMany();
            }
            const businessAccessForUploader = await this.prisma.businessAccess.findMany({
                where: {
                    businessAccess_accountId: uploaderAccount.account_id,
                },
            });
            const businessAccessIds = businessAccessForUploader.map((businesses) => {
                return businesses.businessAccess_businessId;
            });
            return this.prisma.business.findMany({
                where: {
                    business_id: { in: businessAccessIds },
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(id, request, file, updateBusinessDto) {
        try {
            const uploaderAccount = await this.prisma.account.findFirstOrThrow({
                where: {
                    account_email: request.account.email,
                },
            });
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            const businessManagerRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'business manager');
            let accountCanEdit = false;
            if (uploaderAccount.account_roleId === businessManagerRole.role_id) {
                const businessWithBusinessAccess = await this.prisma.business.findFirstOrThrow({
                    where: {
                        business_id: id,
                    },
                    include: {
                        BusinessAccess: {
                            where: {
                                businessAccess_accountId: uploaderAccount.account_id,
                            },
                        },
                    },
                });
                if (businessWithBusinessAccess.BusinessAccess.length === 0) {
                    return 'you do not have permission to access this';
                }
                accountCanEdit = true;
            }
            if (uploaderAccount.account_id === adminRole.role_id || accountCanEdit) {
                return await this.prisma.business.update({
                    where: {
                        business_id: id,
                    },
                    data: {
                        business_name: updateBusinessDto.business_name,
                        business_logo: file !== undefined
                            ? file.filename
                            : updateBusinessDto.business_logo,
                    },
                });
            }
            return await this.prisma.business.update({
                where: {
                    business_id: id,
                },
                data: {
                    business_name: updateBusinessDto.business_name,
                    business_logo: file !== undefined
                        ? file.filename
                        : updateBusinessDto.business_logo,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(id, request) {
        try {
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            if (uploaderAccount.account_roleId === adminRole.role_id) {
                const deleteAlertDetails = this.prisma.alertDetail.deleteMany({
                    where: {
                        alertDetails_businessId: id,
                    },
                });
                const deleteBusinessAccess = this.prisma.businessAccess.deleteMany({
                    where: {
                        businessAccess_businessId: id,
                    },
                });
                const deleteBusinessManagers = this.prisma.businessManager.deleteMany({
                    where: {
                        businessManager_businessId: id,
                    },
                });
                const deleteBusiness = this.prisma.business.delete({
                    where: {
                        business_id: id,
                    },
                });
                return await this.prisma.$transaction([
                    deleteAlertDetails,
                    deleteBusinessAccess,
                    deleteBusinessManagers,
                    deleteBusiness,
                ]);
            }
            else {
                return 'you do not have permission to do this';
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.BusinessesService = BusinessesService;
exports.BusinessesService = BusinessesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusinessesService);
//# sourceMappingURL=businesses.service.js.map