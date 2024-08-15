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
exports.AlertDetailsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils/utils");
let AlertDetailsService = class AlertDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAlertDetailDto) {
        try {
            return await this.prisma.alertDetail.create({
                data: {
                    alertDetails_bannedPersonId: createAlertDetailDto.alertDetailsBannedPersonId,
                    alertDetails_businessId: createAlertDetailDto.alertDetailsBusinessId,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async findAll(uploaderEmail) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, uploaderEmail);
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: {
                    role_name: 'admin',
                },
            });
            if (uploaderInfo.role_id !== adminRole.role_id) {
                return 'you do not have permission to access this';
            }
            return await this.prisma.alertDetail.findMany();
        }
        catch (error) {
            return String(error);
        }
    }
    async findAllByBusiness(id) {
        try {
            return await this.prisma.alertDetail.findMany({
                where: {
                    alertDetails_businessId: id,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.alertDetail.findFirstOrThrow({
                where: {
                    alertDetails_id: id,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async removeAll() {
        try {
            return await this.prisma.alertDetail.deleteMany({});
        }
        catch (error) {
            return String(error);
        }
    }
};
exports.AlertDetailsService = AlertDetailsService;
exports.AlertDetailsService = AlertDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertDetailsService);
//# sourceMappingURL=alert-details.service.js.map