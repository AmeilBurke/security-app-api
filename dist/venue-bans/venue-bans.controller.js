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
exports.VenueBansController = void 0;
const common_1 = require("@nestjs/common");
const venue_bans_service_1 = require("./venue-bans.service");
const create_venue_ban_dto_1 = require("./dto/create-venue-ban.dto");
let VenueBansController = class VenueBansController {
    constructor(venueBansService) {
        this.venueBansService = venueBansService;
    }
    create(request, createVenueBanDto) {
        return this.venueBansService.create(request, createVenueBanDto);
    }
    findAll(request) {
        return this.venueBansService.findAll(request);
    }
    findOne(request, id) {
        return this.venueBansService.findOne(request, Number(id));
    }
    remove(request, id) {
        return this.venueBansService.remove(request, Number(id));
    }
};
exports.VenueBansController = VenueBansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_venue_ban_dto_1.CreateVenueBanDto]),
    __metadata("design:returntype", void 0)
], VenueBansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VenueBansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VenueBansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VenueBansController.prototype, "remove", null);
exports.VenueBansController = VenueBansController = __decorate([
    (0, common_1.Controller)('venue-bans'),
    __metadata("design:paramtypes", [venue_bans_service_1.VenueBansService])
], VenueBansController);
//# sourceMappingURL=venue-bans.controller.js.map