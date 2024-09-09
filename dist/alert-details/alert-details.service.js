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
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
let AlertDetailsService = class AlertDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAlertDetailDto) {
        try {
            return await this.prisma.alertDetail.create({
                data: createAlertDetailDto,
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async remove(id) {
        return await this.prisma.alertDetail.delete({
            where: {
                alertDetails_id: id,
            },
        });
    }
};
exports.AlertDetailsService = AlertDetailsService;
exports.AlertDetailsService = AlertDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertDetailsService);
//# sourceMappingURL=alert-details.service.js.map