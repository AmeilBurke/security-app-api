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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesController = void 0;
const common_1 = require("@nestjs/common");
const venues_service_1 = require("./venues.service");
const create_venue_dto_1 = require("./dto/create-venue.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
let VenuesController = class VenuesController {
    constructor(venuesService) {
        this.venuesService = venuesService;
    }
    create(request, file, createVenueDto) {
        return this.venuesService.create(request, file, createVenueDto);
    }
    findAllVenues(request) {
        return this.venuesService.findAllVenues(request);
    }
    findOne(request, id) {
        return this.venuesService.findAllBansForVenue(request, Number(id));
    }
};
exports.VenuesController = VenuesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'src\\images\\venues',
            filename: (req, file, cb) => {
                const fileType = file.mimetype.split('/')[1];
                cb(null, `${(0, uuid_1.v4)()}.${fileType}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_venue_dto_1.CreateVenueDto]),
    __metadata("design:returntype", void 0)
], VenuesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VenuesController.prototype, "findAllVenues", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VenuesController.prototype, "findOne", null);
exports.VenuesController = VenuesController = __decorate([
    (0, common_1.Controller)('venues'),
    __metadata("design:paramtypes", [venues_service_1.VenuesService])
], VenuesController);
//# sourceMappingURL=venues.controller.js.map