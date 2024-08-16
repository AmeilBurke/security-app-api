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
exports.BusinessesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils/utils");
let BusinessesService = class BusinessesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBusinessDto) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, createBusinessDto.uploaderEmail);
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: {
                    role_name: 'admin',
                },
            });
            if (uploaderInfo.role_id !== adminRole.role_id) {
                return 'you do not have permission to access this';
            }
            return await this.prisma.business.create({
                data: {
                    business_name: createBusinessDto.businessName,
                    business_logo: 'placeholder value',
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
            return await this.prisma.business.findMany();
        }
        catch (error) {
            return String(error);
        }
    }
    async findAllByIds(ids) {
        return await this.prisma.business.findMany({
            where: {
                business_id: { in: ids },
            },
        });
    }
    async findOne(id) {
        try {
            return await this.prisma.business.findFirstOrThrow({
                where: {
                    business_id: id,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async findOneWithVenues(id) {
        try {
            return await this.prisma.business.findFirstOrThrow({
                where: {
                    business_id: id,
                },
                include: {
                    Venue: true,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async update(id, updateBusinessDto) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, updateBusinessDto.uploaderEmail);
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: { role_name: 'admin' },
            });
            if (uploaderInfo.role_id !== adminRole.role_id) {
                return 'you do not have permission to access this';
            }
            return this.prisma.business.update({
                where: {
                    business_id: id,
                },
                data: {
                    business_name: updateBusinessDto.businessName,
                    business_logo: 'need to add file uploads',
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async remove(id, uploaderEmail) {
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, uploaderEmail);
            const adminRole = await this.prisma.role.findFirstOrThrow({
                where: { role_name: 'admin' },
            });
            if (uploaderInfo.role_id !== adminRole.role_id) {
                return 'you do not have permission to access this';
            }
            return this.prisma.business.delete({
                where: {
                    business_id: id,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
};
exports.BusinessesService = BusinessesService;
exports.BusinessesService = BusinessesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusinessesService);
//# sourceMappingURL=businesses.service.js.map