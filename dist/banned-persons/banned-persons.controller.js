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
exports.BannedPersonsController = void 0;
const common_1 = require("@nestjs/common");
const banned_persons_service_1 = require("./banned-persons.service");
const update_banned_person_dto_1 = require("./dto/update-banned-person.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const create_banned_person_with_ban_details_dto_1 = require("./dto/create-banned-person-with-ban-details.dto");
let BannedPersonsController = class BannedPersonsController {
    constructor(bannedPersonsService) {
        this.bannedPersonsService = bannedPersonsService;
    }
    createBannedPersonWithBanDetails(file, createBannedPersonWithBanDetailsDto) {
        return this.bannedPersonsService.createBannedPersonWithBanDetails(createBannedPersonWithBanDetailsDto, file);
    }
    findAll() {
        return this.bannedPersonsService.findAll();
    }
    findOne(id) {
        return this.bannedPersonsService.findOne(Number(id));
    }
    update(id, updateBannedPersonDto) {
        return this.bannedPersonsService.update(Number(id), updateBannedPersonDto);
    }
    remove(id, uploaderEmail) {
        return this.bannedPersonsService.remove(Number(id), uploaderEmail.uploaderEmail);
    }
};
exports.BannedPersonsController = BannedPersonsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'src\\images\\bannedPersons',
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_banned_person_with_ban_details_dto_1.CreateBannedPersonWithBanDetailsDto]),
    __metadata("design:returntype", void 0)
], BannedPersonsController.prototype, "createBannedPersonWithBanDetails", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannedPersonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannedPersonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_banned_person_dto_1.UpdateBannedPersonDto]),
    __metadata("design:returntype", Promise)
], BannedPersonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BannedPersonsController.prototype, "remove", null);
exports.BannedPersonsController = BannedPersonsController = __decorate([
    (0, common_1.Controller)('banned-persons'),
    __metadata("design:paramtypes", [banned_persons_service_1.BannedPersonsService])
], BannedPersonsController);
//# sourceMappingURL=banned-persons.controller.js.map