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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
let BannedPeopleService = class BannedPeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createBannedPersonDto, file) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!file) {
                return (0, utils_1.noFileReceivedError)();
            }
            if (!(0, dayjs_1.default)(createBannedPersonDto.banDetails_banEndDate).isValid()) {
                return (0, utils_1.invalidDayJsDate)();
            }
            const isAccountAdmin = await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount);
            const newBanProfile = await this.prisma.bannedPerson.create({
                data: {
                    bannedPerson_name: createBannedPersonDto.bannedPerson_name
                        .toLocaleLowerCase()
                        .trim(),
                    bannedPerson_imagePath: file.path,
                },
            });
            const currentDateTimeIso = (0, dayjs_1.default)().toISOString();
            const venueBanIds = createBannedPersonDto.banDetails_venueBanIds
                .split(',')
                .map((venueId) => Number(venueId));
            const createBanDetails = await Promise.all(venueBanIds.map(async (venueId) => {
                await this.prisma.banDetail.create({
                    data: {
                        banDetail_bannedPersonId: newBanProfile.bannedPerson_id,
                        banDetail_reason: createBannedPersonDto.banDetails_reason
                            .toLocaleLowerCase()
                            .trim(),
                        banDetail_banStartDate: currentDateTimeIso,
                        banDetail_banEndDate: createBannedPersonDto.banDetails_banEndDate,
                        banDetail_isBanPending: !isAccountAdmin,
                        banDetail_banUploadedBy: requestAccount.account_id,
                        banDetail_venueBanId: venueId,
                    },
                });
            })).catch((error) => {
                return (0, utils_1.handleError)(error);
            });
            if ((0, utils_1.isPrismaResultError)(createBanDetails)) {
                return createBanDetails;
            }
            await this.prisma.alertDetail.create({
                data: {
                    alertDetail_bannedPersonId: newBanProfile.bannedPerson_id,
                    alertDetail_imagePath: newBanProfile.bannedPerson_imagePath,
                    alertDetail_name: newBanProfile.bannedPerson_name,
                    alertDetail_alertReason: createBannedPersonDto.banDetails_reason
                        .toLocaleLowerCase()
                        .trim(),
                    alertDetail_startTime: (0, dayjs_1.default)().toISOString(),
                    alertDetail_alertUploadedBy: requestAccount.account_id,
                },
                include: {
                    Account: {
                        select: {
                            account_name: true,
                        },
                    },
                },
            });
            const copyDestination = path_1.default.resolve(__dirname, '..', '..', 'images', 'alerts', file.filename);
            try {
                await fs.promises.copyFile(file.path, copyDestination);
                console.log(`file copied to ${copyDestination}`);
            }
            catch (error) {
                console.log(`error copying file`);
                console.log(error);
            }
            const newBannedPerson = await this.prisma.bannedPerson.findFirst({
                where: {
                    bannedPerson_id: newBanProfile.bannedPerson_id,
                },
                include: {
                    BanDetail: true,
                    AlertDetail: true,
                },
            });
            newBannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${file.filename}`;
            newBannedPerson.AlertDetail.map((alertDetail) => {
                alertDetail.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${file.filename}`;
                return alertDetail;
            });
            return newBannedPerson;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllBlanketBanned(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const allVenueIds = new Set((await this.prisma.venue.findMany({
                select: {
                    venue_id: true,
                },
            })).map((venueId) => venueId.venue_id));
            const peopleWithActiveBans = await this.prisma.bannedPerson.findMany({
                where: {
                    BanDetail: {
                        some: {
                            banDetail_banEndDate: { gt: (0, dayjs_1.default)().toISOString() },
                            banDetail_isBanPending: false,
                        },
                    },
                },
                include: {
                    BanDetail: true,
                },
                orderBy: {
                    bannedPerson_name: 'asc',
                },
            });
            const filteredBannedPeople = peopleWithActiveBans.filter((bannedPerson) => {
                let bannedFromVenueIds = new Set();
                bannedPerson.BanDetail.some((banDetail) => {
                    bannedFromVenueIds.add(banDetail.banDetail_venueBanId);
                });
                if (bannedFromVenueIds.size === allVenueIds.size) {
                    return bannedPerson;
                }
            });
            return filteredBannedPeople.map((bannedPerson) => {
                bannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path_1.default.basename(bannedPerson.bannedPerson_imagePath)}`;
                return bannedPerson;
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllByVenueId(request, venueId) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            return await this.prisma.bannedPerson.findMany({
                where: {
                    BanDetail: {
                        some: {
                            banDetail_venueBanId: venueId,
                            banDetail_banEndDate: { gt: (0, dayjs_1.default)().toISOString() },
                            banDetail_isBanPending: false,
                        },
                    },
                },
                include: {
                    BanDetail: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllExpired(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            return await this.prisma.bannedPerson.findMany({
                where: {
                    BanDetail: {
                        every: {
                            banDetail_banEndDate: { lt: (0, dayjs_1.default)().toISOString() },
                        },
                    },
                },
                include: {
                    BanDetail: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllWithActiveAlert(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const peopleWithActiveBans = await this.prisma.bannedPerson.findMany({
                where: {
                    AlertDetail: {
                        some: {},
                    },
                },
                include: {
                    AlertDetail: {
                        include: {
                            Account: {
                                select: {
                                    account_name: true,
                                },
                            },
                        },
                    },
                    BanDetail: {
                        include: {
                            Account: {
                                select: {
                                    account_name: true,
                                },
                            },
                        },
                    },
                },
            });
            return peopleWithActiveBans.map((person) => {
                person.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path_1.default.basename(person.bannedPerson_imagePath)}`;
                person.AlertDetail.map((alert) => {
                    alert.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path_1.default.basename(person.bannedPerson_imagePath)}`;
                });
                return person;
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllWithPendingBans(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            return await this.prisma.bannedPerson.findMany({
                where: {
                    BanDetail: {
                        some: {
                            banDetail_isBanPending: true,
                        },
                    },
                },
                include: {
                    BanDetail: {
                        where: {
                            banDetail_isBanPending: true,
                        },
                        include: {
                            Account: {
                                select: {
                                    account_name: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    bannedPerson_name: 'asc',
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllWithoutPendingBans(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const activeBannedPeople = await this.prisma.bannedPerson.findMany({
                where: {
                    BanDetail: {
                        every: {
                            banDetail_isBanPending: false,
                        },
                    },
                },
                orderBy: {
                    bannedPerson_name: 'asc',
                },
            });
            return activeBannedPeople.map((bannedPerson) => {
                bannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path_1.default.basename(bannedPerson.bannedPerson_imagePath)}`;
                return bannedPerson;
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
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
            const activeBannedPeople = await this.prisma.bannedPerson.findMany({
                orderBy: {
                    bannedPerson_name: 'asc',
                },
            });
            return activeBannedPeople.map((bannedPerson) => {
                bannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path_1.default.basename(bannedPerson.bannedPerson_imagePath)}`;
                return bannedPerson;
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async updateOneBannedPerson(request, file, bannedPersonId, updateBannedPersonDto) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) &&
                !(await (0, utils_1.isAccountSecurityRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            const bannedPersonToUpdate = await this.prisma.bannedPerson.findFirst({
                where: {
                    bannedPerson_id: bannedPersonId,
                },
            });
            if ((0, utils_1.isPrismaResultError)(bannedPersonToUpdate)) {
                return bannedPersonToUpdate;
            }
            const updatedBannedPerson = await this.prisma.bannedPerson.update({
                where: {
                    bannedPerson_id: bannedPersonId,
                },
                data: {
                    bannedPerson_name: updateBannedPersonDto.bannedPerson_name,
                    bannedPerson_imagePath: file
                        ? file.path
                        : updateBannedPersonDto.bannedPerson_imagePath,
                },
            });
            updatedBannedPerson.bannedPerson_imagePath = `${process.env.API_URL}/images/people/${path_1.default.basename(updatedBannedPerson.bannedPerson_imagePath)}`;
            if (file) {
                try {
                    await fs.promises.unlink(bannedPersonToUpdate.bannedPerson_imagePath);
                }
                catch (error) {
                    console.log(`error removing file at: ${file.path}`);
                }
            }
            else {
            }
            return updatedBannedPerson;
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