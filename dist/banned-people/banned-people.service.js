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
let BannedPeopleService = class BannedPeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, bannedPersonWithBanDetailsDto) {
        try {
            if (file === undefined) {
                bannedPersonWithBanDetailsDto.bannedPerson_image = 'undefined';
            }
            const banProfile = await this.prisma.bannedPerson.create({
                data: {
                    bannedPerson_image: bannedPersonWithBanDetailsDto.bannedPerson_image,
                    bannedPerson_name: bannedPersonWithBanDetailsDto.bannedPerson_name
                        .toLocaleLowerCase()
                        .trim(),
                },
            });
            console.log(banProfile);
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
            const banDetails = await this.prisma.banDetail.create({
                data: {
                    banDetail_reason: bannedPersonWithBanDetailsDto.banDetail_reason,
                    banDetail_startDate: bannedPersonWithBanDetailsDto.banDetail_startDate,
                    banDetail_endDate: bannedPersonWithBanDetailsDto.banDetail_endDate,
                    banDetail_isBanPending: isBanPending,
                    banDetail_bannedPersonId: banProfile.bannedPerson_id,
                },
            });
            return this.prisma.bannedPerson.findFirstOrThrow({
                where: {
                    bannedPerson_id: banProfile.bannedPerson_id,
                },
                include: {
                    BanDetail: true,
                },
            });
        }
        catch (error) {
            (0, utils_1.handleError)(error);
        }
    }
    findAll() {
        return `This action returns all bannedPeople`;
    }
    findOne(id) {
        return `This action returns a #${id} bannedPerson`;
    }
    update(id, updateBannedPersonDto) {
        return `This action updates a #${id} bannedPerson`;
    }
    remove(id) {
        return `This action removes a #${id} bannedPerson`;
    }
};
exports.BannedPeopleService = BannedPeopleService;
exports.BannedPeopleService = BannedPeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannedPeopleService);
//# sourceMappingURL=banned-people.service.js.map