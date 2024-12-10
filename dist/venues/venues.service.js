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
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (file === undefined) {
                return 'you need to upload a photo for the venue';
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return 'you do not have permission to access this';
            }
            return await this.prisma.venue.create({
                data: {
                    venue_name: createVenueDto.venue_name.toLocaleLowerCase().trim(),
                    venue_imagePath: file.filename,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllVenues(request) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const accountRole = await this.prisma.role.findFirstOrThrow({
                where: {
                    role_id: requestAccount.account_roleId,
                },
            });
            if (accountRole.role_name === 'venue manager') {
                return 'you do not have permission to access this';
            }
            const allVenues = await this.prisma.venue.findMany();
            const allVenuesConvertedImage = allVenues.map((venue) => {
                try {
                    const filePath = path.join('src\\images\\venues\\', venue.venue_imagePath);
                    const fileBuffer = fs.readFileSync(filePath);
                    venue.venue_imagePath = fileBuffer.toString('base64');
                    return venue;
                }
                catch (error) {
                    console.log(error);
                }
            });
            return allVenuesConvertedImage;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllBansForVenue(request, id) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const accountRole = await this.prisma.role.findFirstOrThrow({
                where: {
                    role_id: requestAccount.account_roleId,
                },
            });
            const venueBannedAccounts = await this.prisma.bannedPerson.findMany({
                where: {
                    VenueBan: {
                        some: {
                            venueBan_venueId: id,
                        },
                    },
                },
            });
            const venuBannedAccountBase64Images = venueBannedAccounts.map((bannedPerson) => {
                try {
                    const filePath = path.join('src\\images\\people\\', bannedPerson.bannedPerson_imageName);
                    const fileBuffer = fs.readFileSync(filePath);
                    bannedPerson.bannedPerson_imageName = fileBuffer.toString('base64');
                    return bannedPerson;
                }
                catch (error) {
                    console.log(error);
                }
            });
            return venuBannedAccountBase64Images;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(request, file, id, updateVenueDto) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const accountRole = await this.prisma.role.findFirstOrThrow({
                where: {
                    role_id: requestAccount.account_roleId,
                },
            });
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                const venueManagers = await this.prisma.venueManager.findMany({
                    where: {
                        venueManager_accountId: requestAccount.account_id,
                    },
                });
                if (venueManagers.length === 0) {
                    return 'you do not have permission to access this';
                }
            }
            return await this.prisma.venue.update({
                where: {
                    venue_id: id,
                },
                data: {
                    venue_name: updateVenueDto.venue_name,
                    venue_imagePath: file !== undefined ? file.filename : updateVenueDto.venue_imagePath,
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
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return 'you do not have permission to access this';
            }
            const deletedBanDetails = await this.prisma.banDetail.deleteMany({
                where: {
                    banDetails_venueBanId: id,
                },
            });
            const deletedVenueBans = await this.prisma.venueBan.deleteMany({
                where: {
                    venueBan_venueId: id,
                },
            });
            const deletedVenueAccess = await this.prisma.venueAccess.deleteMany({
                where: {
                    venueAccess_venueId: id,
                },
            });
            console.log(`${deletedBanDetails.count} related ban details deleted`);
            console.log(`${deletedVenueBans.count} related venue bans deleted`);
            console.log(`${deletedVenueAccess.count} related venue access deleted`);
            return await this.prisma.venue.delete({
                where: {
                    venue_id: id,
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