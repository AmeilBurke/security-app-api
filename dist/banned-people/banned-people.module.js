"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannedPeopleModule = void 0;
const common_1 = require("@nestjs/common");
const banned_people_service_1 = require("./banned-people.service");
const banned_people_controller_1 = require("./banned-people.controller");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const banned_people_gateway_1 = require("./banned-people.gateway");
let BannedPeopleModule = class BannedPeopleModule {
};
exports.BannedPeopleModule = BannedPeopleModule;
exports.BannedPeopleModule = BannedPeopleModule = __decorate([
    (0, common_1.Module)({
        controllers: [banned_people_controller_1.BannedPeopleController],
        providers: [banned_people_gateway_1.BannedPeopleGateway, banned_people_service_1.BannedPeopleService, prisma_service_1.PrismaService, jwt_1.JwtService],
    })
], BannedPeopleModule);
//# sourceMappingURL=banned-people.module.js.map