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
exports.VenueManagersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
let VenueManagersService = class VenueManagersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createVenueManagerDto) {
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
            return await this.prisma.venueManager.create({
                data: {
                    venueManager_accountId: createVenueManagerDto.venueManager_accountId,
                    venueManager_venueId: createVenueManagerDto.venueManager_venueId,
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
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            return await this.prisma.venueManager.findMany();
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(request, id) {
        try {
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(request, id, updateVenueManagerDto) {
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
            return await this.prisma.venueManager.update({
                where: {
                    venueManager_id: id,
                },
                data: {
                    venueManager_accountId: updateVenueManagerDto.venueManager_accountId,
                    venueManager_venueId: updateVenueManagerDto.venueManager_venueId,
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
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return (0, utils_1.accountIsUnauthorized)();
            }
            return await this.prisma.venueManager.delete({
                where: {
                    venueManager_id: id,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.VenueManagersService = VenueManagersService;
exports.VenueManagersService = VenueManagersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenueManagersService);
//# sourceMappingURL=venue-managers.service.js.map