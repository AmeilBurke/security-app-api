"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsService = void 0;
const common_1 = require("@nestjs/common");
let AlertDetailsService = class AlertDetailsService {
    create(createAlertDetailDto) {
        return 'This action adds a new alertDetail';
    }
    findAll() {
        return `This action returns all alertDetails`;
    }
    findOne(id) {
        return `This action returns a #${id} alertDetail`;
    }
    update(id, updateAlertDetailDto) {
        return `This action updates a #${id} alertDetail`;
    }
    remove(id) {
        return `This action removes a #${id} alertDetail`;
    }
};
exports.AlertDetailsService = AlertDetailsService;
exports.AlertDetailsService = AlertDetailsService = __decorate([
    (0, common_1.Injectable)()
], AlertDetailsService);
//# sourceMappingURL=alert-details.service.js.map