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
exports.AlertDetailsController = void 0;
const common_1 = require("@nestjs/common");
const alert_details_service_1 = require("./alert-details.service");
const create_alert_detail_dto_1 = require("./dto/create-alert-detail.dto");
const update_alert_detail_dto_1 = require("./dto/update-alert-detail.dto");
let AlertDetailsController = class AlertDetailsController {
    constructor(alertDetailsService) {
        this.alertDetailsService = alertDetailsService;
    }
    create(createAlertDetailDto) {
        return this.alertDetailsService.create(createAlertDetailDto);
    }
    findAll() {
        return this.alertDetailsService.findAll();
    }
    findOne(id) {
        return this.alertDetailsService.findOne(+id);
    }
    update(id, updateAlertDetailDto) {
        return this.alertDetailsService.update(+id, updateAlertDetailDto);
    }
    remove(id) {
        return this.alertDetailsService.remove(+id);
    }
};
exports.AlertDetailsController = AlertDetailsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alert_detail_dto_1.CreateAlertDetailDto]),
    __metadata("design:returntype", void 0)
], AlertDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlertDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlertDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alert_detail_dto_1.UpdateAlertDetailDto]),
    __metadata("design:returntype", void 0)
], AlertDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlertDetailsController.prototype, "remove", null);
exports.AlertDetailsController = AlertDetailsController = __decorate([
    (0, common_1.Controller)('alert-details'),
    __metadata("design:paramtypes", [alert_details_service_1.AlertDetailsService])
], AlertDetailsController);
//# sourceMappingURL=alert-details.controller.js.map