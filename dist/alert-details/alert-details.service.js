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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const socket_io_1 = require("socket.io");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const schedule_1 = require("@nestjs/schedule");
let AlertDetailsService = class AlertDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload, createAlertDetailDto, imageName, server) {
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
                minute = String(dateNow.minute());
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
            const latestAlert = await this.prisma.alertDetail.findUniqueOrThrow({
                where: {
                    alertDetail_id: newAlert.alertDetail_id,
                },
                include: {
                    account_id: true,
                },
            });
            console.log(latestAlert);
            try {
                const filePath = path.join('src\\images\\people\\', latestAlert.alertDetail_imageName);
                const fileBuffer = fs.readFileSync(filePath);
                latestAlert.alertDetail_imageName = fileBuffer.toString('base64');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            server.emit('onAlertCreate', {
                latestAlert: latestAlert,
                latestAlertTime: `${dateNow.date()}/${dateNow.month() + 1}/${dateNow.year()}T${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}:${dateNow.millisecond()}`,
            });
            console.log({
                latestAlert: latestAlert,
                latestAlertTime: `${dateNow.date()}/${dateNow.month() + 1}/${dateNow.year()}T${dateNow.hour()}:${dateNow.minute()}:${dateNow.second()}:${dateNow.millisecond()}`,
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(payload, updateAlertDetailDto, imageName, server) {
        try {
            if (!payload.sub) {
                return 'There was an unspecified error';
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, payload.sub);
            if (typeof requestAccount === 'string') {
                return 'there was an error with requestAccount';
            }
            await this.prisma.alertDetail.update({
                where: {
                    alertDetail_id: updateAlertDetailDto.alertDetail_id,
                },
                data: {
                    alertDetail_name: updateAlertDetailDto.alertDetail_name,
                    alertDetail_imageName: imageName === ''
                        ? updateAlertDetailDto.alertDetail_imageName
                        : imageName,
                    alertDetails_alertReason: updateAlertDetailDto.alertDetail_alertReason,
                },
            });
            const allAlerts = await this.prisma.alertDetail.findMany();
            server.emit('onAlertUpdate', {
                allAlerts: allAlerts,
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAll(request) {
        if (!request.account) {
            return 'There was an unspecified error';
        }
        const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
        if (typeof requestAccount === 'string') {
            return 'there was an error with requestAccount';
        }
        return await this.prisma.alertDetail.findMany();
    }
    async remove(server) {
        try {
            await this.prisma.alertDetail.deleteMany();
            server.emit('onAlertUpdate', {
                allAlerts: [],
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
};
exports.AlertDetailsService = AlertDetailsService;
__decorate([
    (0, schedule_1.Cron)('0 6 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server]),
    __metadata("design:returntype", Promise)
], AlertDetailsService.prototype, "remove", null);
exports.AlertDetailsService = AlertDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertDetailsService);
//# sourceMappingURL=alert-details.service.js.map