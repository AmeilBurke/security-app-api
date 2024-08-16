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
exports.BannedPersonsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils/utils");
let BannedPersonsService = class BannedPersonsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBannedPersonWithBanDetails(createBannedPersonWithBanDetailsDto, file) {
        let isBanPending = false;
        if (file === undefined) {
            createBannedPersonWithBanDetailsDto.bannedPersonImage = 'placeholder value';
        }
        else {
            createBannedPersonWithBanDetailsDto.bannedPersonImage = file.path;
        }
        try {
            const uploaderInfo = await (0, utils_1.getFullAccountInfoFromEmail)(this.prisma, createBannedPersonWithBanDetailsDto.uploaderEmail);
            const securityRole = await (0, utils_1.getSecurityRoleFromDB)(this.prisma);
            if (uploaderInfo.role_id === securityRole.role_id) {
                isBanPending = true;
            }
            const bannedPersonRecord = await this.prisma.bannedPerson.create({
                data: {
                    bannedPerson_image: createBannedPersonWithBanDetailsDto.bannedPersonImage,
                    bannedPerson_name: createBannedPersonWithBanDetailsDto.bannedPersonName,
                },
            });
            const bannedPersonBanDetail = await this.prisma.banDetail.create({
                data: {
                    banDetail_reason: createBannedPersonWithBanDetailsDto.banDetailReason,
                    banDetail_startDate: createBannedPersonWithBanDetailsDto.banDetailStartDate,
                    banDetail_endDate: createBannedPersonWithBanDetailsDto.banDetailEndDate,
                    banDetail_isBanPending: isBanPending,
                    bannedPerson_id: bannedPersonRecord.bannedPerson_id,
                },
            });
            return [bannedPersonRecord, bannedPersonBanDetail];
        }
        catch (error) {
            return String(error);
        }
    }
    async findAll() {
        try {
            return await this.prisma.bannedPerson.findMany();
        }
        catch (error) {
            return String(error);
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.bannedPerson.findUniqueOrThrow({
                where: {
                    bannedPerson_id: id,
                },
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async findOneWithBanDetails(id) {
        try {
            return await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
                include: {
                    BanDetail: true
                }
            });
        }
        catch (error) {
            return String(error);
        }
    }
    async update(id, updateBannedPersonDto) {
        try {
            return this.prisma.bannedPerson.update({
                where: {
                    bannedPerson_id: id,
                },
                data: {
                    bannedPerson_image: updateBannedPersonDto.bannedPersonImage,
                    bannedPerson_name: updateBannedPersonDto.bannedPersonName,
                },
            });
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
            const securityRole = await this.prisma.role.findFirst({
                where: {
                    role_name: 'security',
                },
            });
            if (uploaderInfo.role_id === securityRole.role_id) {
                return 'you do not have persmission to remove banned people';
            }
            else {
                return await this.prisma.bannedPerson.delete({
                    where: {
                        bannedPerson_id: id,
                    },
                });
            }
        }
        catch (error) {
            return String(error);
        }
    }
};
exports.BannedPersonsService = BannedPersonsService;
exports.BannedPersonsService = BannedPersonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannedPersonsService);
//# sourceMappingURL=banned-persons.service.js.map