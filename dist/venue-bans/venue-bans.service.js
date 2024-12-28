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
exports.VenueBansService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
let VenueBansService = class VenueBansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createVenueBanDto) {
        try {
            if (!request.account) {
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount)) {
                return await this.prisma.venueBan.create({
                    data: {
                        venueBan_bannedPersonId: createVenueBanDto.venueBan_bannedPersonId,
                        venueBan_venueId: createVenueBanDto.venueBan_venueId,
                    },
                });
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAll(request) {
        try {
            if (!request.account) {
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            return await this.prisma.venueBan.findMany();
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(request, id) {
        try {
            if (!request.account) {
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            return await this.prisma.venueBan.findFirstOrThrow({
                where: {
                    venueBan_venueId: id,
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
                console.log(request.account);
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            return await this.prisma.venueBan.delete({
                where: {
                    venueBan_id: id,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.VenueBansService = VenueBansService;
exports.VenueBansService = VenueBansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenueBansService);
//# sourceMappingURL=venue-bans.service.js.map