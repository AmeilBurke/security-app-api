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
exports.VenueManagersController = void 0;
const common_1 = require("@nestjs/common");
const venue_managers_service_1 = require("./venue-managers.service");
const create_venue_manager_dto_1 = require("./dto/create-venue-manager.dto");
const update_venue_manager_dto_1 = require("./dto/update-venue-manager.dto");
let VenueManagersController = class VenueManagersController {
    constructor(venueManagersService) {
        this.venueManagersService = venueManagersService;
    }
    create(request, createVenueManagerDto) {
        return this.venueManagersService.create(request, createVenueManagerDto);
    }
    findAll(request) {
        return this.venueManagersService.findAll(request);
    }
    findOne(request, id) {
        return this.venueManagersService.findOne(request, Number(id));
    }
    findOneByVenueID(request, id) {
        return this.venueManagersService.findOneByVenueID(request, Number(id));
    }
    update(request, id, updateVenueManagerDto) {
        return this.venueManagersService.update(request, Number(id), updateVenueManagerDto);
    }
    remove(request, id) {
        return this.venueManagersService.remove(request, Number(id));
    }
};
exports.VenueManagersController = VenueManagersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_venue_manager_dto_1.CreateVenueManagerDto]),
    __metadata("design:returntype", void 0)
], VenueManagersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VenueManagersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VenueManagersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/venue/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VenueManagersController.prototype, "findOneByVenueID", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_venue_manager_dto_1.UpdateVenueManagerDto]),
    __metadata("design:returntype", void 0)
], VenueManagersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VenueManagersController.prototype, "remove", null);
exports.VenueManagersController = VenueManagersController = __decorate([
    (0, common_1.Controller)('venue-managers'),
    __metadata("design:paramtypes", [venue_managers_service_1.VenueManagersService])
], VenueManagersController);
//# sourceMappingURL=venue-managers.controller.js.map