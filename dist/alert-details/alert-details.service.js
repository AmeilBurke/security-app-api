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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
const dayjs_1 = __importDefault(require("dayjs"));
let AlertDetailsService = class AlertDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload, createAlertDetailDto, imageName, fileExtension, server) {
        try {
            if (!payload.sub) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, payload.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            const dateNow = (0, dayjs_1.default)();
            let minute;
            if (dateNow.minute() <= 9) {
                minute = `0${dateNow.minute()}`;
            }
            else {
                minute = dateNow.minute();
            }
            const newAlert = await this.prisma.alertDetail.create({
                data: {
                    alertDetail_bannedPersonId: createAlertDetailDto.alertDetail_bannedPersonId,
                    alertDetail_name: createAlertDetailDto.alertDetail_name,
                    alertDetail_imageName: imageName,
                    alertDetails_alertReason: createAlertDetailDto.alertDetails_alertReason,
                    alertDetails_startTime: `${dateNow.hour()}:${minute} ${dateNow.date()}-${dateNow.month() + 1}-${dateNow.year()}`,
                    alertDetails_alertUploadedBy: requestAccount.account_id,
                },
            });
            console.log(newAlert);
            server.emit('onAlertCreate', {
                alertDetail: newAlert,
                imageName: createAlertDetailDto.fileData,
                fileExtension: fileExtension,
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.AlertDetailsService = AlertDetailsService;
exports.AlertDetailsService = AlertDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertDetailsService);
//# sourceMappingURL=alert-details.service.js.map