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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
let BannedPeopleService = class BannedPeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload, createBannedPersonDto, imageName, server) {
        try {
            if (!payload.sub) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, payload.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const newBanProfile = await this.prisma.bannedPerson.create({
                data: {
                    bannedPerson_name: createBannedPersonDto.bannedPerson_name
                        .toLocaleLowerCase()
                        .trim(),
                    bannedPerson_imageName: imageName,
                },
            });
            const isBanPending = await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount);
            const [banEndDay, banEndMonth, banEndYear] = createBannedPersonDto.banDetails.banDetails_banEndDate.split('-');
            const venueIds = createBannedPersonDto.banDetails.banDetails_venueBanIds
                .split(',')
                .map((ids) => {
                return Number(ids);
            });
            const dateNow = (0, dayjs_1.default)();
            venueIds.map(async (venueId) => {
                await this.prisma.banDetail.create({
                    data: {
                        banDetails_bannedPersonId: newBanProfile.bannedPerson_id,
                        banDetails_reason: createBannedPersonDto.banDetails.banDetails_reason
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
                    alertDetail_imageName: imageName,
                    alertDetails_alertReason: createBannedPersonDto.banDetails.banDetails_reason
                        .toLocaleLowerCase()
                        .trim(),
                    alertDetails_startTime: `${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}`,
                    alertDetails_alertUploadedBy: requestAccount.account_id,
                },
            });
            const allAlerts = await this.prisma.alertDetail.findMany();
            const alertsWithBase64Image = allAlerts.map((alertDetail) => {
                try {
                    const filePath = path_1.default.join('src\\images\\people\\', alertDetail.alertDetail_imageName);
                    const fileBuffer = fs.readFileSync(filePath);
                    alertDetail.alertDetail_imageName = fileBuffer.toString('base64');
                    return alertDetail;
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.message);
                    }
                }
            });
            server.emit('onBanCreate', {
                allAlerts: alertsWithBase64Image,
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
            const allBannedPeopleWithImages = allBannedPeople.map((bannedPerson) => {
                try {
                    const filePath = path_1.default.join('src\\images\\people\\', bannedPerson.bannedPerson_imageName);
                    const fileBuffer = fs.readFileSync(filePath);
                    bannedPerson.bannedPerson_imageName = fileBuffer.toString('base64');
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.message);
                        bannedPerson.bannedPerson_imageName === 'undefined';
                    }
                }
                return bannedPerson;
            });
            const bannedPeopleWithActiveBans = allBannedPeopleWithImages.filter((bannedPerson) => {
                return bannedPerson.BanDetail.some((banDetail) => {
                    return (0, dayjs_1.default)(banDetail.banDetails_banEndDate, 'DD-MM-YYYY').isAfter((0, dayjs_1.default)(), 'day');
                });
            });
            const bannedPeopleWithNonActiveBans = allBannedPeople.filter((bannedPerson) => {
                return bannedPerson.BanDetail.some((banDetail) => {
                    return (0, dayjs_1.default)(banDetail.banDetails_banEndDate, 'DD-MM-YYYY').isBefore((0, dayjs_1.default)(), 'day');
                });
            });
            return {
                active_bans: bannedPeopleWithActiveBans,
                non_active_bans: bannedPeopleWithNonActiveBans,
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
            const bannedPersonDetails = await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
                include: {
                    BanDetail: true,
                    AlertDetail: true,
                },
            });
            try {
                const filePath = path_1.default.join('src\\images\\people\\', bannedPersonDetails.bannedPerson_imageName);
                const fileBuffer = fs.readFileSync(filePath);
                bannedPersonDetails.bannedPerson_imageName = fileBuffer.toString('base64');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            return bannedPersonDetails;
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
                fs.unlink(filePath, () => { });
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