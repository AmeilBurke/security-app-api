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
exports.VenuesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils/utils");
let VenuesService = class VenuesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createVenueDto) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, createVenueDto.uploaderEmail);
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: { role_name: 'admin' },
            });
            if (uploaderInfo.role_id !== adminRole.role_id) {
                return 'you do not have permission to access this';
            }
            return await this.prisma.venue.create({
                data: {
                    venue_name: createVenueDto.venueName,
                    venue_logo: 'need to implement file',
                    business_id: createVenueDto.businessId,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async businessOwnerCreateVenue() { }
    async findAll(uploaderEmail) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, uploaderEmail);
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: { role_name: 'admin' },
            });
            if (uploaderInfo.role_id !== adminRole.role_id) {
                return 'you do not have permission to access this';
            }
            return await this.prisma.venue.findMany();
        }
        catch (error) {
            String(error);
        }
    }
    async allowedForAccount(id, uploaderEmail) {
        try {
            const uploaderInfo = await this.prisma.account.findFirstOrThrow({
                where: { account_email: uploaderEmail },
            });
            const allowedVenues = await this.prisma.accountVenueAccess.findMany({
                where: {
                    accountId: uploaderInfo.account_id,
                },
            });
            const allowedVenueIds = allowedVenues.map((venues) => {
                return venues.venue_id;
            });
            return await this.prisma.venue.findMany({
                where: {
                    business_id: {
                        in: allowedVenueIds,
                    },
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async update(id, updateVenueDto) {
        try {
            const uploaderInfo = await this.prisma.account.findFirstOrThrow({
                where: {
                    account_email: updateVenueDto.uploaderEmail,
                },
            });
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: {
                    role_name: 'admin',
                },
            });
            if (uploaderInfo.role_id === adminRole.role_id) {
                return await this.prisma.venue.update({
                    where: {
                        venue_id: id,
                    },
                    data: {
                        venue_name: updateVenueDto.venueName,
                        venue_logo: updateVenueDto.venueLogo,
                        business_id: updateVenueDto.businessId,
                    },
                });
            }
            const venueManagerRecord = await this.prisma.accountVenueAccess.findFirstOrThrow({
                where: {
                    accountVenueAccess_isVenueManager: true,
                },
            });
            if (uploaderInfo.account_id === venueManagerRecord.accountId) {
                return await this.prisma.venue.update({
                    where: {
                        venue_id: id,
                    },
                    data: {
                        venue_name: updateVenueDto.venueName,
                        venue_logo: updateVenueDto.venueLogo,
                        business_id: updateVenueDto.businessId,
                    },
                });
            }
            else {
                return 'you do not have permission to access this';
            }
        }
        catch (error) {
            return String(error);
        }
    }
    async remove(id, uploaderEmail) {
        try {
            const uploaderInfo = await this.prisma.account.findFirstOrThrow({
                where: {
                    account_email: uploaderEmail,
                },
            });
            const venueManagerRecord = await this.prisma.accountVenueAccess.findFirstOrThrow({
                where: {
                    accountVenueAccess_isVenueManager: true,
                    AND: {
                        venue_id: id
                    }
                },
            });
            console.log(venueManagerRecord);
        }
        catch (error) { }
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenuesService);
//# sourceMappingURL=venues.service.js.map