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
exports.BannedPeopleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
const dayjs_1 = __importDefault(require("dayjs"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
let BannedPeopleService = class BannedPeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, createBannedPersonDto) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const newBanProfile = await this.prisma.bannedPerson.create({
                data: {
                    bannedPerson_name: createBannedPersonDto.bannedPerson_name
                        .toLocaleLowerCase()
                        .trim(),
                    bannedPerson_imageName: file.filename,
                },
            });
            const isBanPending = await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount);
            const [banEndDay, banEndMonth, banEndYear] = createBannedPersonDto.banDetails_banEndDate.split('-');
            const venueIds = createBannedPersonDto.banDetails_venueBanIds
                .split(',')
                .map((ids) => {
                return Number(ids);
            });
            const dateNow = (0, dayjs_1.default)();
            venueIds.map(async (venueId) => {
                await this.prisma.banDetail.create({
                    data: {
                        banDetails_bannedPersonId: newBanProfile.bannedPerson_id,
                        banDetails_reason: createBannedPersonDto.banDetails_reason
                            .toLocaleLowerCase()
                            .trim(),
                        banDetails_banStartDate: `${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
                        banDetails_banEndDate: `${banEndDay}-${banEndMonth}-${banEndYear}`,
                        banDetails_venueBanId: venueId,
                        banDetails_isBanPending: !isBanPending,
                        banDetails_banUploadedBy: requestAccount.account_id,
                    },
                });
            });
            await this.prisma.alertDetail.create({
                data: {
                    alertDetail_bannedPersonId: newBanProfile.bannedPerson_id,
                    alertDetail_name: newBanProfile.bannedPerson_name,
                    alertDetail_imageName: file.filename,
                    alertDetails_alertReason: createBannedPersonDto.banDetails_reason
                        .toLocaleLowerCase()
                        .trim(),
                    alertDetails_startTime: `${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}`,
                    alertDetails_alertUploadedBy: requestAccount.account_id,
                },
            });
            return this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: newBanProfile.bannedPerson_id,
                },
                include: {
                    BanDetail: true,
                    AlertDetail: true,
                },
            });
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
            const allBannedPeople = await this.prisma.bannedPerson.findMany({
                include: {
                    BanDetail: true,
                },
            });
            const bannedPeopleWithActiveBans = allBannedPeople.filter((bannedPerson) => {
                return bannedPerson.BanDetail.some((banDetail) => {
                    return (0, dayjs_1.default)(banDetail.banDetails_banEndDate, 'DD-MM-YYYY').isAfter((0, dayjs_1.default)(), 'day');
                });
            });
            const bannedPeeopleWithNonActiveBans = allBannedPeople.filter((bannedPerson) => {
                return bannedPerson.BanDetail.some((banDetail) => {
                    return (0, dayjs_1.default)(banDetail.banDetails_banEndDate, 'DD-MM-YYYY').isBefore((0, dayjs_1.default)(), 'day');
                });
            });
            return {
                active_bans: bannedPeopleWithActiveBans,
                non_active_bans: bannedPeeopleWithNonActiveBans,
            };
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOneInfo(request, id) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            return await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
                include: {
                    BanDetail: true,
                    AlertDetail: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOnePhoto(request, response, id) {
        try {
            const bannedPersonProfile = await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
            });
            const file = (0, fs_1.createReadStream)(`src\\images\\people\\${bannedPersonProfile.bannedPerson_imageName}`);
            response.set({
                'Content-Type': `image/${bannedPersonProfile.bannedPerson_imageName.split('.')[1]}`,
            });
            return new common_1.StreamableFile(file);
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(request, file, id, updateBannedPersonDto) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const bannedPersonDetails = await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
            });
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                const requestAccountVenueManager = await this.prisma.venueManager.findMany({
                    where: {
                        venueManager_accountId: requestAccount.account_id,
                    },
                });
                const requestAccountVenueManagerIds = requestAccountVenueManager.map((venueManager) => {
                    return venueManager.venueManager_venueId;
                });
                const bannedPersonDetailsWithVenuBan = await this.prisma.bannedPerson.findFirstOrThrow({
                    where: {
                        bannedPerson_id: id,
                    },
                    include: {
                        VenueBan: {
                            where: {
                                venueBan_venueId: { in: requestAccountVenueManagerIds },
                            },
                        },
                    },
                });
                if (bannedPersonDetailsWithVenuBan.VenueBan.length === 0) {
                    return 'you do not have permission to access this';
                }
            }
            if (file !== undefined) {
                const filePath = path_1.default.join('src\\images\\people', bannedPersonDetails.bannedPerson_imageName);
                await fs_1.promises.unlink(filePath);
            }
            return this.prisma.bannedPerson.update({
                where: {
                    bannedPerson_id: id,
                },
                data: {
                    bannedPerson_name: updateBannedPersonDto.bannedPerson_name,
                    bannedPerson_imageName: file !== undefined
                        ? file.filename
                        : updateBannedPersonDto.bannedPerson_imagePath,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.BannedPeopleService = BannedPeopleService;
exports.BannedPeopleService = BannedPeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannedPeopleService);
//# sourceMappingURL=banned-people.service.js.map