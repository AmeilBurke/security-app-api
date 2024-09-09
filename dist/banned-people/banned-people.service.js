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
exports.BannedPeopleService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma.service");
const fs_1 = require("fs");
let BannedPeopleService = class BannedPeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, createBannedPersonWithBanDetailsDto) {
        try {
            if (file === undefined) {
                createBannedPersonWithBanDetailsDto.bannedPerson_image = 'undefined';
            }
            const banProfile = await this.prisma.bannedPerson.create({
                data: {
                    bannedPerson_image: file.filename,
                    bannedPerson_name: createBannedPersonWithBanDetailsDto.bannedPerson_name
                        .toLocaleLowerCase()
                        .trim(),
                },
            });
            const uploaderAccount = await (0, utils_1.getAccountWithEmail)(this.prisma, request.account.email);
            if (uploaderAccount === undefined) {
                return 'uploaderAccount is undefined';
            }
            const adminRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'admin');
            const venueManagerRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'venue manager');
            const businessManagerRole = await (0, utils_1.getRoleFromDB)(this.prisma, 'business manager');
            const acceptedRoles = [
                adminRole.role_id,
                venueManagerRole.role_id,
                businessManagerRole.role_id,
            ];
            const isBanPending = !acceptedRoles.includes(uploaderAccount.account_roleId);
            await this.prisma.banDetail.create({
                data: {
                    banDetail_reason: createBannedPersonWithBanDetailsDto.banDetail_reason,
                    banDetail_startDate: createBannedPersonWithBanDetailsDto.banDetail_startDate,
                    banDetail_endDate: createBannedPersonWithBanDetailsDto.banDetail_endDate,
                    banDetail_isBanPending: isBanPending,
                    banDetail_bannedPersonId: banProfile.bannedPerson_id,
                },
            });
            if (typeof createBannedPersonWithBanDetailsDto.banLocation_venues ===
                'string') {
                const venueIdsConverted = JSON.parse(createBannedPersonWithBanDetailsDto.banLocation_venues).map((toBeConverted) => {
                    return Number(toBeConverted);
                });
                createBannedPersonWithBanDetailsDto.banLocation_venues =
                    venueIdsConverted;
            }
            const locationsToBeBannedFrom = createBannedPersonWithBanDetailsDto.banLocation_venues.map((venuIds) => {
                return {
                    banLocation_bannedPersonId: banProfile.bannedPerson_id,
                    banLocation_venueId: venuIds,
                };
            });
            await this.prisma.banLocation.createMany({
                data: locationsToBeBannedFrom,
            });
            return await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: banProfile.bannedPerson_id,
                },
                include: {
                    BanDetail: true,
                    BanLocation: true,
                },
            });
        }
        catch (error) {
            (0, utils_1.handleError)(error);
        }
    }
    async createAlert(id, businessId) {
        try {
            return this.prisma.alertDetail.create({
                data: {
                    alertDetails_bannedPersonId: id,
                    alertDetails_businessId: businessId,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAll() {
        try {
            return `This action returns all bannedPeople`;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findOne(id, res) {
        try {
            return await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
                include: {
                    BanDetail: true,
                    BanLocation: true,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async getAccountPicture(id, res) {
        try {
            const bannedPersonDetails = await this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: id,
                },
            });
            if (bannedPersonDetails.bannedPerson_image === 'undefined') {
                return 'this person does not have any photos';
            }
            else {
                const file = (0, fs_1.createReadStream)(`src\\images\\people\\${bannedPersonDetails.bannedPerson_image}`);
                res.set({
                    'Content-Type': `image/${bannedPersonDetails.bannedPerson_image.split('.')[1]}`,
                });
                return new common_1.StreamableFile(file);
            }
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async getBannedPeopleByEstablishment(id) {
        try {
            const banLocationForVenue = await this.prisma.banLocation.findMany({
                where: {
                    banLocation_venueId: id,
                },
            });
            const bannedPeopleIds = banLocationForVenue.map((banLocations) => {
                return banLocations.banLocation_bannedPersonId;
            });
            return await this.prisma.bannedPerson.findMany({
                where: {
                    bannedPerson_id: {
                        in: bannedPeopleIds,
                    },
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(id, file, updateBannedPersonDto) {
        try {
            return this.prisma.bannedPerson.update({
                where: {
                    bannedPerson_id: id,
                },
                data: {
                    bannedPerson_name: updateBannedPersonDto.bannedPerson_name,
                    bannedPerson_image: file !== undefined
                        ? file.filename
                        : updateBannedPersonDto.bannedPerson_image,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    remove(id) {
        try {
            return this.prisma.bannedPerson.delete({
                where: {
                    bannedPerson_id: id,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.BannedPeopleService = BannedPeopleService;
exports.BannedPeopleService = BannedPeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannedPeopleService);
//# sourceMappingURL=banned-people.service.js.map