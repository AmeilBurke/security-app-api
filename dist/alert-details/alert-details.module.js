"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const alert_details_service_1 = require("./alert-details.service");
const alert_details_gateway_1 = require("./alert-details.gateway");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const alert_details_controller_1 = require("./alert-details.controller");
let AlertDetailsModule = class AlertDetailsModule {
};
exports.AlertDetailsModule = AlertDetailsModule;
exports.AlertDetailsModule = AlertDetailsModule = __decorate([
    (0, common_1.Module)({
        controllers: [alert_details_controller_1.AlertDetailsController],
        providers: [
            alert_details_gateway_1.AlertDetailsGateway,
            alert_details_service_1.AlertDetailsService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
        ],
    })
], AlertDetailsModule);
//# sourceMappingURL=alert-details.module.js.map