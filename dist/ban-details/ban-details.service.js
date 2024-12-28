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
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            let isBanPending;
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                isBanPending = false;
            }
            else {
                isBanPending = true;
            }
            const dateNow = (0, dayjs_1.default)();
            const [banEndDay, banEndMonth, banEndYear] = createBanDetailDto.banDetails_banEndDate.split('-');
            const banDetailsData = createBanDetailDto.banDetails_venueBanIds.map((venueId) => {
                return {
                    banDetails_bannedPersonId: createBanDetailDto.banDetails_bannedPersonId,
                    banDetails_reason: createBanDetailDto.banDetails_reason
                        .toLocaleLowerCase()
                        .trim(),
                    banDetails_banStartDate: `${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
                    banDetails_banEndDate: `${banEndDay}-${banEndMonth}-${banEndYear}`,
                    banDetails_venueBanId: venueId,
                    banDetails_isBanPending: isBanPending,
                    banDetails_banUploadedBy: requestAccount.account_id,
                };
            });
            return await this.prisma.banDetail.createMany({
                data: banDetailsData,
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAll(request) {
        try {
            if (!request.account) {
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const allBanDetails = await this.prisma.banDetail.findMany();
            const activeBans = allBanDetails.filter((banDetail) => {
                return banDetail.banDetails_isBanPending === true;
            });
            const nonActiveBans = allBanDetails.filter((banDetail) => {
                return banDetail.banDetails_isBanPending === false;
            });
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return {
                    active_bans: activeBans,
                    non_active_bans: nonActiveBans,
                };
            }
            else {
                return {
                    active_bans: activeBans,
                    non_active_bans: null,
                };
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findBanDetailsByAccountId(request, accountId) {
        try {
            if (!request.account) {
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            return await this.prisma.banDetail.findFirstOrThrow({
                where: {
                    banDetails_bannedPersonId: accountId,
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
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            return await this.prisma.banDetail.update({
                where: {
                    banDetails_id: id,
                },
                data: {
                    banDetails_reason: updateBanDetailDto.banDetails_reason
                        .toLocaleLowerCase()
                        .trim(),
                    banDetails_banStartDate: updateBanDetailDto.banDetails_banStartDate,
                    banDetails_banEndDate: updateBanDetailDto.banDetails_banEndDate,
                    banDetails_isBanPending: (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))
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
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return await this.prisma.banDetail.delete({
                    where: {
                        banDetails_id: id,
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
exports.BanDetailsService = BanDetailsService;
exports.BanDetailsService = BanDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BanDetailsService);
//# sourceMappingURL=ban-details.service.js.map