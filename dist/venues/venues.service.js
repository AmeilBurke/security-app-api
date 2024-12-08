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
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
let VenuesService = class VenuesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, file, createVenueDto) {
        try {
            if (!request.account) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            if (file === undefined) {
                return 'you need to upload a photo for the venue';
            }
            if (!(await (0, utils_1.isAccountAdminRole)(this.prisma, requestAccount))) {
                return 'you do not have permission to access this';
            }
            return await this.prisma.venue.create({
                data: {
                    venue_name: createVenueDto.venue_name.toLocaleLowerCase().trim(),
                    venue_imagePath: file.filename,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    findAll() {
        return `This action returns all venues`;
    }
    findOne(id) {
        return `This action returns a #${id} venue`;
    }
    update(id, updateVenueDto) {
        return `This action updates a #${id} venue`;
    }
    remove(id) {
        return `This action removes a #${id} venue`;
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenuesService);
//# sourceMappingURL=venues.service.js.map