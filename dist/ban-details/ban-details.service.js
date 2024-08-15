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
exports.BanDetailsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils/utils");
let BanDetailsService = class BanDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBanDetailDto) {
        try {
            let isBanPending = false;
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, createBanDetailDto.uploaderEmail);
            const securityRole = await (0, utils_1.getSecurityRoleFromDB)(this.prisma);
            if (uploaderInfo.role_id === securityRole.role_id) {
                isBanPending = true;
            }
            return await this.prisma.banDetail.create({
                data: {
                    banDetail_reason: createBanDetailDto.banDetailReason
                        .toLocaleLowerCase()
                        .trim(),
                    banDetail_startDate: createBanDetailDto.banDetailStartDate,
                    banDetail_endDate: createBanDetailDto.banDetailEndDate,
                    banDetail_isBanPending: isBanPending,
                    bannedPerson_id: createBanDetailDto.bannedPersonId,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async findAll() {
        try {
            return await this.prisma.banDetail.findMany();
        }
        catch (error) {
            return String(error);
        }
    }
    async findOne(id) {
        return await this.prisma.banDetail.findFirstOrThrow({
            where: {
                banDetail_id: id,
            },
        });
    }
    async update(id, updateBanDetailDto) {
        try {
            return await this.prisma.banDetail.update({
                where: {
                    banDetail_id: id,
                },
                data: {
                    banDetail_reason: updateBanDetailDto.banDetailReason,
                    banDetail_startDate: updateBanDetailDto.banDetailStartDate,
                    banDetail_endDate: updateBanDetailDto.banDetailEndDate,
                    bannedPerson_id: updateBanDetailDto.bannedPersonId,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async updateIsBanPending(id, banDecisionDto) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, banDecisionDto.uploaderEmail);
            const securityRole = await (0, utils_1.getSecurityRoleFromDB)(this.prisma);
            if (uploaderInfo.role_id === securityRole.role_id) {
                return String('you do not have permission to edit this');
            }
            if (banDecisionDto.banDecision === true) {
                return await this.prisma.banDetail.update({
                    where: {
                        banDetail_id: id,
                    },
                    data: {
                        banDetail_isBanPending: banDecisionDto.banDecision,
                    },
                });
            }
            else {
                return await this.prisma.banDetail.delete({
                    where: {
                        banDetail_id: id,
                    },
                });
            }
        }
        catch (error) {
            return String(error);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.banDetail.delete({
                where: {
                    banDetail_id: id,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
};
exports.BanDetailsService = BanDetailsService;
exports.BanDetailsService = BanDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BanDetailsService);
//# sourceMappingURL=ban-details.service.js.map