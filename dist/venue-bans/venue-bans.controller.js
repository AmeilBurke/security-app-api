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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueBansController = void 0;
const common_1 = require("@nestjs/common");
const venue_bans_service_1 = require("./venue-bans.service");
let VenueBansController = class VenueBansController {
    constructor(venueBansService) {
        this.venueBansService = venueBansService;
    }
};
exports.VenueBansController = VenueBansController;
exports.VenueBansController = VenueBansController = __decorate([
    (0, common_1.Controller)('venue-bans'),
    __metadata("design:paramtypes", [venue_bans_service_1.VenueBansService])
], VenueBansController);
//# sourceMappingURL=venue-bans.controller.js.map