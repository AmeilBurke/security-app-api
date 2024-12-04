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
exports.BannedPeopleController = void 0;
const common_1 = require("@nestjs/common");
const banned_people_service_1 = require("./banned-people.service");
const update_banned_person_dto_1 = require("./dto/update-banned-person.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
let BannedPeopleController = class BannedPeopleController {
    constructor(bannedPeopleService) {
        this.bannedPeopleService = bannedPeopleService;
    }
    create(request, file, createBannedPersonDto) {
        return this.bannedPeopleService.create(request, file, createBannedPersonDto);
    }
    findAll(request) {
        return this.bannedPeopleService.findAll(request);
    }
    findOneInfo(request, id) {
        return this.bannedPeopleService.findOneInfo(request, Number(id));
    }
    findOneWithPhoto(request, response, id) {
        return this.bannedPeopleService.findOnePhoto(request, response, Number(id));
    }
    update(request, file, id, updateBannedPersonDto) {
        return this.bannedPeopleService.update(request, file, Number(id), updateBannedPersonDto);
    }
};
exports.BannedPeopleController = BannedPeopleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'src\\images\\people',
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
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], BannedPeopleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BannedPeopleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BannedPeopleController.prototype, "findOneInfo", null);
__decorate([
    (0, common_1.Get)('/photo/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], BannedPeopleController.prototype, "findOneWithPhoto", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'src\\images\\people',
            filename: (req, file, cb) => {
                const fileType = file.mimetype.split('/')[1];
                cb(null, `${(0, uuid_1.v4)()}.${fileType}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, update_banned_person_dto_1.UpdateBannedPersonDto]),
    __metadata("design:returntype", void 0)
], BannedPeopleController.prototype, "update", null);
exports.BannedPeopleController = BannedPeopleController = __decorate([
    (0, common_1.Controller)('banned-people'),
    __metadata("design:paramtypes", [banned_people_service_1.BannedPeopleService])
], BannedPeopleController);
//# sourceMappingURL=banned-people.controller.js.map