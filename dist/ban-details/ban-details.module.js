"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const ban_details_service_1 = require("./ban-details.service");
const ban_details_controller_1 = require("./ban-details.controller");
const prisma_service_1 = require("../prisma.service");
let BanDetailsModule = class BanDetailsModule {
};
exports.BanDetailsModule = BanDetailsModule;
exports.BanDetailsModule = BanDetailsModule = __decorate([
    (0, common_1.Module)({
        controllers: [ban_details_controller_1.BanDetailsController],
        providers: [ban_details_service_1.BanDetailsService, prisma_service_1.PrismaService],
    })
], BanDetailsModule);
//# sourceMappingURL=ban-details.module.js.map