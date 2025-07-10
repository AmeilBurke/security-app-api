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
                    bannedPerson_name: createBannedPersonDto.name
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
                const banDetail = await this.prisma.banDetail.create({
                    data: {
                        banDetail_bannedPersonId: newBanProfile.bannedPerson_id,
                        banDetail_reason: createBannedPersonDto.banDetails_reason
                            .toLocaleLowerCase()
                            .trim(),
                        banDetail_banStartDate: currentDateTimeIso,
                        banDetail_banEndDate: createBannedPersonDto.banDetails_banEndDate,
                        banDetail_isBanPending: !isAccountAdmin,
                        banDetail_banUploadedBy: requestAccount.account_id,
                    },
                });
                await this.prisma.banDetailVenue.create({
                    data: {
                        banDetail_id: banDetail.banDetail_id,
                        venue_id: venueId,
                    },
                });
            })).catch((error) => {
                return (0, utils_1.handleError)(error);
            });
            if ((0, utils_1.isPrismaResultError)(createBanDetails)) {
                return createBanDetails;
            }
            const copyDestination = path_1.default.resolve(__dirname, '..', '..', 'images', 'alerts', file.filename);
            await this.prisma.alertDetail.create({
                data: {
                    alertDetail_bannedPersonId: newBanProfile.bannedPerson_id,
                    alertDetail_imagePath: copyDestination,
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
};
exports.BannedPeopleService = BannedPeopleService;
exports.BannedPeopleService = BannedPeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannedPeopleService);
//# sourceMappingURL=banned-people.service.js.map