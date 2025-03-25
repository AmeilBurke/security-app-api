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
exports.VenueAccessService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
let VenueAccessService = class VenueAccessService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createVenueAccessDto) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return await this.prisma.venueAccess.create({
                    data: {
                        venueAccess_accountId: createVenueAccessDto.venueAccess_accountId,
                        venueAccess_venueId: createVenueAccessDto.venueAccess_venueId,
                    },
                });
            }
            else {
                return (0, utils_1.accountIsUnauthorized)();
            }
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
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return await this.prisma.venueAccess.delete({
                    where: {
                        venueAccess_id: id,
                    },
                });
            }
            else {
                return (0, utils_1.accountIsUnauthorized)();
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.VenueAccessService = VenueAccessService;
exports.VenueAccessService = VenueAccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenueAccessService);
//# sourceMappingURL=venue-access.service.js.map