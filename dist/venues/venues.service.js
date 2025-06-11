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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let VenuesService = class VenuesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, createVenueDto) {
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
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            const newVenue = await this.prisma.venue.create({
                data: {
                    venue_name: createVenueDto.venue_name.toLocaleLowerCase().trim(),
                    venue_imagePath: file.path,
                },
            });
            newVenue.venue_imagePath = `${process.env.API_URL}/images/venues/${file.filename}`;
            const adminAndSecurityRole = await this.prisma.role.findMany({
                select: {
                    role_id: true,
                },
                where: {
                    OR: [
                        {
                            role_name: 'admin',
                        },
                        {
                            role_name: 'security',
                        },
                    ],
                },
            });
            const adminAndSecurityRoleIds = adminAndSecurityRole.map((roleId) => roleId.role_id);
            const adminAndSecurityAccounts = await this.prisma.account.findMany({
                where: {
                    account_roleId: {
                        in: adminAndSecurityRoleIds,
                    },
                },
            });
            const venueAccessData = adminAndSecurityAccounts.map((account) => {
                return {
                    venueAccess_venueId: newVenue.venue_id,
                    venueAccess_accountId: account.account_id,
                };
            });
            await this.prisma.venueAccess.createMany({
                data: venueAccessData,
            });
            return newVenue;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllvenues(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if ((await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) ||
                (await (0, utils_1.isAccountSecurityRole)(this.prisma, requestAccount))) {
                const allVenues = await this.prisma.venue.findMany({
                    include: {
                        VenueManager: true,
                    },
                });
                return allVenues.map((venue) => {
                    venue.venue_imagePath = `${process.env.API_URL}/images/venues/${path.basename(venue.venue_imagePath)}`;
                    return venue;
                });
            }
            const venueAccess = (await this.prisma.account.findFirst({
                where: {
                    account_id: requestAccount.account_id,
                },
                include: {
                    VenueAccess: true,
                },
            })).VenueAccess.map((venueAccess) => venueAccess.venueAccess_venueId);
            const allVenues = await this.prisma.venue.findMany({
                where: {
                    venue_id: {
                        in: venueAccess,
                    },
                },
                include: {
                    VenueManager: true,
                },
                orderBy: {
                    venue_name: 'asc'
                }
            });
            return allVenues.map((venue) => {
                venue.venue_imagePath = `${process.env.API_URL}/images/venues/${path.basename(venue.venue_imagePath)}`;
                return venue;
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async updateOneVenue(request, file, venueId, updateVenueDto) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            const oldVenueImage = await this.prisma.venue.findFirst({
                where: {
                    venue_id: venueId,
                },
                select: {
                    venue_imagePath: true,
                },
            });
            const updatedVenue = await this.prisma.venue.update({
                where: {
                    venue_id: venueId,
                },
                data: {
                    venue_imagePath: file ? file.path : updateVenueDto.venue_imagePath,
                    venue_name: updateVenueDto.venue_name,
                },
            });
            if (file) {
                updatedVenue.venue_imagePath = `${process.env.API_URL}/images/venues/${file.filename}`;
                try {
                    await fs.promises.unlink(oldVenueImage.venue_imagePath);
                }
                catch (error) {
                    console.log(`error removing file at: ${file.path}`);
                }
            }
            else {
                updatedVenue.venue_imagePath = `${process.env.API_URL}/images/venues/${path.basename(updatedVenue.venue_imagePath)}`;
            }
            return updatedVenue;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async deleteOneVenue(request, venueId) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            const venueToBeDeleted = await this.prisma.venue.findFirstOrThrow({
                where: {
                    venue_id: venueId,
                },
            });
            try {
                await fs.promises.unlink(venueToBeDeleted.venue_imagePath);
            }
            catch (error) {
                console.log(`error removing file at: ${venueToBeDeleted.venue_imagePath}`);
            }
            await this.prisma.banDetail.deleteMany({
                where: {
                    banDetails_venueBanId: venueId,
                },
            });
            await this.prisma.venueAccess.deleteMany({
                where: {
                    venueAccess_venueId: venueId,
                },
            });
            return await this.prisma.venue.delete({
                where: {
                    venue_id: venueId,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenuesService);
//# sourceMappingURL=venues.service.js.map