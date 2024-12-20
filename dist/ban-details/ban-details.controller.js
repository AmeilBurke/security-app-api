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
exports.BanDetailsController = void 0;
const common_1 = require("@nestjs/common");
const ban_details_service_1 = require("./ban-details.service");
const create_ban_detail_dto_1 = require("./dto/create-ban-detail.dto");
const update_ban_detail_dto_1 = require("./dto/update-ban-detail.dto");
let BanDetailsController = class BanDetailsController {
    constructor(banDetailsService) {
        this.banDetailsService = banDetailsService;
    }
    create(createBanDetailDto) {
        return this.banDetailsService.create(createBanDetailDto);
    }
    findAll() {
        return this.banDetailsService.findAll();
    }
    findOne(id) {
        return this.banDetailsService.findOne(+id);
    }
    update(id, updateBanDetailDto) {
        return this.banDetailsService.update(+id, updateBanDetailDto);
    }
    remove(id) {
        return this.banDetailsService.remove(+id);
    }
};
exports.BanDetailsController = BanDetailsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ban_detail_dto_1.CreateBanDetailDto]),
    __metadata("design:returntype", void 0)
], BanDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BanDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BanDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ban_detail_dto_1.UpdateBanDetailDto]),
    __metadata("design:returntype", void 0)
], BanDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BanDetailsController.prototype, "remove", null);
exports.BanDetailsController = BanDetailsController = __decorate([
    (0, common_1.Controller)('ban-details'),
    __metadata("design:paramtypes", [ban_details_service_1.BanDetailsService])
], BanDetailsController);
//# sourceMappingURL=ban-details.controller.js.map