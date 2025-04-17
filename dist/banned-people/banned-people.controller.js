"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.BannedPeopleController = void 0;
const common_1 = require("@nestjs/common");
const banned_people_service_1 = require("./banned-people.service");
const update_banned_person_dto_1 = require("./dto/update-banned-person.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const fs = __importStar(require("fs"));
let BannedPeopleController = class BannedPeopleController {
    constructor(bannedPeopleService) {
        this.bannedPeopleService = bannedPeopleService;
    }
    async create(request, createBannedPerson, file) {
        const result = await this.bannedPeopleService.create(request, createBannedPerson, file);
        if ((0, utils_1.isPrismaResultError)(result)) {
            try {
                fs.promises.unlink(file.path);
                console.log(`file ${file.path} removed`);
            }
            catch (error) {
                console.log(`error removing file at: ${file.path}`);
            }
        }
        return result;
    }
    async findAllBlanketBanned(request) {
        return await this.bannedPeopleService.findAllBlanketBanned(request);
    }
    async findAllByVenueId(request, venueId) {
        return await this.bannedPeopleService.findAllByVenueId(request, Number(venueId));
    }
    async findAllExpired(request) {
        return await this.bannedPeopleService.findAllExpired(request);
    }
    async findAllWithActiveAlert(request) {
        return await this.bannedPeopleService.findAllWithActiveAlert(request);
    }
    async findAllWithPendingBans(request) {
        return await this.bannedPeopleService.findAllWithPendingBans(request);
    }
    async findAllWithoutPendingBans(request) {
        return await this.bannedPeopleService.findAllWithoutPendingBans(request);
    }
    async update(request, file, id, updateBannedPersonDto) {
        const result = await this.bannedPeopleService.updateOneBannedPerson(request, file, Number(id), updateBannedPersonDto);
        if ((0, utils_1.isPrismaResultError)(result) && file) {
            try {
                fs.promises.unlink(file.path);
            }
            catch (error) {
                console.log(`error removing file at: ${file.path}`);
            }
        }
        return result;
    }
};
exports.BannedPeopleController = BannedPeopleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            files: 1,
        },
        storage: (0, multer_1.diskStorage)({
            destination: path_1.default.join(__dirname, '..', '..', 'images', 'people'),
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
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/blanket-banned'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "findAllBlanketBanned", null);
__decorate([
    (0, common_1.Get)('/venue/:venueId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "findAllByVenueId", null);
__decorate([
    (0, common_1.Get)('/expired'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "findAllExpired", null);
__decorate([
    (0, common_1.Get)('/active-alert'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "findAllWithActiveAlert", null);
__decorate([
    (0, common_1.Get)('/pending'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "findAllWithPendingBans", null);
__decorate([
    (0, common_1.Get)('/not-pending'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "findAllWithoutPendingBans", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            files: 1,
        },
        storage: (0, multer_1.diskStorage)({
            destination: path_1.default.join(__dirname, '..', '..', 'images', 'people'),
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
    __metadata("design:returntype", Promise)
], BannedPeopleController.prototype, "update", null);
exports.BannedPeopleController = BannedPeopleController = __decorate([
    (0, common_1.Controller)('banned-people'),
    __metadata("design:paramtypes", [banned_people_service_1.BannedPeopleService])
], BannedPeopleController);
//# sourceMappingURL=banned-people.controller.js.map