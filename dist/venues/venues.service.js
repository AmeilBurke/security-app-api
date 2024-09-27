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
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
let VenuesService = class VenuesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, createVenueDto) {
        try {
            if (file === undefined) {
                createVenueDto.venue_logo = 'undefined';
            }
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            if (typeof createVenueDto.venue_businessId === 'string') {
                createVenueDto.venue_businessId = Number(createVenueDto.venue_businessId);
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            const businessManagerRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'business manager');
            let canUserCreateVenues = false;
            if (uploaderAccount.account_roleId === businessManagerRole.role_id) {
                const uploaderBusinessAccess = await this.prisma.businessAccess.findFirstOrThrow({
                    where: {
                        businessAccess_accountId: uploaderAccount.account_id,
                        businessAccess_businessId: createVenueDto.venue_businessId,
                    },
                });
                if (typeof uploaderBusinessAccess !== 'string') {
                    canUserCreateVenues = true;
                }
            }
            if (canUserCreateVenues === true) {
                const newVenue = await this.prisma.venue.create({
                    data: {
                        venue_name: createVenueDto.venue_name,
                        venue_logo: file.filename,
                        venue_businessId: createVenueDto.venue_businessId,
                    },
                });
                if (createVenueDto.venue_managerIds) {
                    if (typeof createVenueDto.venue_managerIds === 'string') {
                        const managerIdsConverted = JSON.parse(createVenueDto.venue_managerIds).map((toBeConverted) => {
                            return Number(toBeConverted);
                        });
                        createVenueDto.venue_managerIds = managerIdsConverted;
                        const newManagers = createVenueDto.venue_managerIds.map((accountId) => {
                            return {
                                venueManager_accountId: accountId,
                                venueManager_venueId: newVenue.venue_id,
                            };
                        });
                        await this.prisma.venueManager.createMany({
                            data: newManagers,
                        });
                    }
                }
                return await this.prisma.venue.findFirstOrThrow({
                    where: {
                        venue_id: newVenue.venue_id,
                    },
                    include: {
                        VenueManager: true,
                    },
                });
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAllVenuesByBusinessIds(req, businessIds) {
        try {
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(id, request) {
        try {
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(id, request, updateVenueDto) {
        try {
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(id, request) {
        try {
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