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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanDetailsService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
const dayjs_1 = __importDefault(require("dayjs"));
let BanDetailsService = class BanDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createBanDetailDto) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            let isBanPending;
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                isBanPending = false;
            }
            else {
                isBanPending = true;
            }
            const currentDateTimeIso = (0, dayjs_1.default)().toISOString();
            const banDetailData = createBanDetailDto.venuesToBeBannedFrom.map((venueId) => {
                return {
                    banDetail_bannedPersonId: createBanDetailDto.bannedPersonId,
                    banDetail_reason: createBanDetailDto.banReason.toLocaleLowerCase().trim(),
                    banDetail_banStartDate: currentDateTimeIso,
                    banDetail_banEndDate: createBanDetailDto.banEndDate,
                    banDetail_venueBanId: venueId,
                    banDetail_isBanPending: isBanPending,
                    banDetail_banUploadedBy: requestAccount.account_id,
                };
            });
            return await this.prisma.banDetail.createMany({
                data: banDetailData,
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findBanDetailsByAccountId(request, accountId) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            return await this.prisma.banDetail.findFirstOrThrow({
                where: {
                    banDetail_bannedPersonId: accountId,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async updateIndividualBanDetail(request, id, updateBanDetailDto) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            return await this.prisma.banDetail.update({
                where: {
                    banDetail_id: id,
                },
                data: {
                    banDetail_reason: updateBanDetailDto.banDetails_reason
                        .toLocaleLowerCase()
                        .trim(),
                    banDetail_banStartDate: updateBanDetailDto.banDetails_banStartDate,
                    banDetail_banEndDate: updateBanDetailDto.banDetails_banEndDate,
                    banDetail_isBanPending: (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))
                        ? false
                        : true,
                },
            });
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
                return await this.prisma.banDetail.delete({
                    where: {
                        banDetail_id: id,
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
exports.BanDetailsService = BanDetailsService;
exports.BanDetailsService = BanDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BanDetailsService);
//# sourceMappingURL=ban-details.service.js.map