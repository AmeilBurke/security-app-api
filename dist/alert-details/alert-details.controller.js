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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsController = void 0;
const common_1 = require("@nestjs/common");
const alert_details_service_1 = require("./alert-details.service");
const create_alert_detail_dto_1 = require("./dto/create-alert-detail.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const update_alert_detail_dto_1 = require("./dto/update-alert-detail.dto");
let AlertDetailsController = class AlertDetailsController {
    constructor(alertDetailService) {
        this.alertDetailService = alertDetailService;
    }
    async create(request, createAlertDetailDto, file) {
        return await this.alertDetailService.create(request, createAlertDetailDto, file);
    }
    async findAll(request) {
        return await this.alertDetailService.findAll(request);
    }
    async findOne(request, alertDetailId) {
        return await this.alertDetailService.findIndividualActiveBan(request, Number(alertDetailId));
    }
    async update(request, updateAlertDetailDto, alertDetailId, file) {
        return await this.alertDetailService.update(request, updateAlertDetailDto, Number(alertDetailId), file);
    }
    async deleteAll(request) {
        return await this.alertDetailService.deleteAll(request);
    }
    async deleteOne(request, alertDetailId) {
        return await this.alertDetailService.deleteOne(request, Number(alertDetailId));
    }
};
exports.AlertDetailsController = AlertDetailsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            files: 1,
        },
        storage: (0, multer_1.diskStorage)({
            destination: path_1.default.join(__dirname, '..', '..', 'images', 'uncompressed'),
            filename: (req, file, cb) => {
                const fileType = file.mimetype.split('/')[1];
                cb(null, `${(0, uuid_1.v4)()}.${fileType}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_alert_detail_dto_1.CreateAlertDetailDto, Object]),
    __metadata("design:returntype", Promise)
], AlertDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':alertDetailId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('alertDetailId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AlertDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':alertDetailId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            files: 1,
        },
        storage: (0, multer_1.diskStorage)({
            destination: path_1.default.join(__dirname, '..', '..', 'images', 'alerts'),
            filename: (req, file, cb) => {
                const fileType = file.mimetype.split('/')[1];
                cb(null, `${(0, uuid_1.v4)()}.${fileType}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('alertDetailId')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_alert_detail_dto_1.UpdateAlertDetailDto, String, Object]),
    __metadata("design:returntype", Promise)
], AlertDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertDetailsController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Delete)(':alertDetailId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('alertDetailId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AlertDetailsController.prototype, "deleteOne", null);
exports.AlertDetailsController = AlertDetailsController = __decorate([
    (0, common_1.Controller)('alert-details'),
    __metadata("design:paramtypes", [alert_details_service_1.AlertDetailsService])
], AlertDetailsController);
//# sourceMappingURL=alert-details.controller.js.map