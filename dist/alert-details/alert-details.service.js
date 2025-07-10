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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
const dayjs_1 = __importDefault(require("dayjs"));
const fs = __importStar(require("fs"));
const schedule_1 = require("@nestjs/schedule");
const path_1 = __importDefault(require("path"));
let AlertDetailsService = class AlertDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createAlertDetail, file) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (!file) {
                return (0, utils_1.noFileReceivedError)();
            }
            let isValidNumber = false;
            if (createAlertDetail.alertDetail_bannedPersonId &&
                !isNaN(Number(createAlertDetail.alertDetail_bannedPersonId))) {
                isValidNumber = true;
            }
            const compressedImagePath = await (0, utils_1.compressImage)(file, path_1.default.join(__dirname, '..', '..', 'images', 'alerts'));
            const newAlertDetail = await this.prisma.alertDetail.create({
                data: {
                    alertDetail_bannedPersonId: isValidNumber
                        ? Number(createAlertDetail.alertDetail_bannedPersonId)
                        : null,
                    alertDetail_name: createAlertDetail.alertDetail_name
                        .toLocaleLowerCase()
                        .trim(),
                    alertDetail_imagePath: compressedImagePath,
                    alertDetail_alertReason: createAlertDetail.alertDetail_alertReason
                        .toLocaleLowerCase()
                        .trim(),
                    alertDetail_startTime: (0, dayjs_1.default)().toISOString(),
                    alertDetail_alertUploadedBy: requestAccount.account_id,
                },
            });
            try {
                fs.promises.unlink(path_1.default.join(file.destination, file.filename));
            }
            catch (error) {
                console.log(error);
            }
            newAlertDetail.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path_1.default.basename(newAlertDetail.alertDetail_imagePath)}`;
            return newAlertDetail;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findAll(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const activeBans = await this.prisma.alertDetail.findMany({
                include: {
                    Account: {
                        select: {
                            account_name: true,
                        },
                    },
                },
            });
            return activeBans.map((person) => {
                person.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path_1.default.basename(person.alertDetail_imagePath)}`;
                return person;
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async findIndividualActiveBan(request, alertDetailId) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const ban = await this.prisma.alertDetail.findFirstOrThrow({
                where: {
                    alertDetail_id: alertDetailId,
                },
                include: {
                    Account: {
                        select: {
                            account_name: true,
                        },
                    },
                },
            });
            ban.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path_1.default.basename(ban.alertDetail_imagePath)}`;
            return ban;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async update(request, updateAlertDetailDto, alertDetailId, file) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            if (file) {
                const alertDetailToBeDeleted = await this.prisma.alertDetail.findFirstOrThrow({
                    where: {
                        alertDetail_id: alertDetailId,
                    },
                });
                try {
                    await fs.promises.unlink(alertDetailToBeDeleted.alertDetail_imagePath);
                }
                catch (error) {
                    console.log(`error removing file at: ${file.path}`);
                }
            }
            const newAlertDetail = await this.prisma.alertDetail.update({
                where: {
                    alertDetail_id: alertDetailId,
                },
                data: {
                    alertDetail_bannedPersonId: Number(updateAlertDetailDto.alertDetail_bannedPersonId),
                    alertDetail_name: updateAlertDetailDto.alertDetail_name,
                    alertDetail_imagePath: file
                        ? file.path
                        : updateAlertDetailDto.alertDetail_imagePath,
                    alertDetail_alertReason: updateAlertDetailDto.alertDetail_alertReason,
                    alertDetail_startTime: (0, dayjs_1.default)().toISOString(),
                    alertDetail_alertUploadedBy: requestAccount.account_id,
                },
            });
            newAlertDetail.alertDetail_imagePath = `${process.env.API_URL}/images/alerts/${path_1.default.basename(newAlertDetail.alertDetail_imagePath)}`;
            return newAlertDetail;
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async deleteAll(request) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const allAlertDetails = await this.prisma.alertDetail.findMany();
            const filePaths = allAlertDetails.map((alertDetail) => {
                return alertDetail.alertDetail_imagePath;
            });
            filePaths.map(async (filePath) => {
                await fs.promises.unlink(filePath);
            });
            return await this.prisma.alertDetail.deleteMany();
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async deleteOne(request, alertDetailId) {
        try {
            if (!request.account) {
                return (0, utils_1.noRequestAccountError)();
            }
            const requestAccount = await (0, utils_1.getAccountInfoFromId)(this.prisma, request.account.sub);
            if ((0, utils_1.isPrismaResultError)(requestAccount)) {
                return requestAccount;
            }
            const alertDetailToDelete = await this.prisma.alertDetail.findFirstOrThrow({
                where: {
                    alertDetail_id: alertDetailId,
                },
            });
            try {
                await fs.promises.unlink(alertDetailToDelete.alertDetail_imagePath);
            }
            catch (error) {
                console.log(`error removing file at: ${alertDetailToDelete.alertDetail_imagePath}`);
            }
            return await this.prisma.alertDetail.delete({
                where: {
                    alertDetail_id: alertDetailId,
                },
            });
        }
        catch (error) {
            return (0, utils_1.handleError)(error);
        }
    }
    async cronDeleteAll() {
        try {
            console.log('cron run');
            const allAlertDetails = await this.prisma.alertDetail.findMany();
            allAlertDetails.map(async (alertDetail) => {
                try {
                    await fs.promises.unlink(alertDetail.alertDetail_imagePath);
                }
                catch (error) {
                    console.log(`error removing file at: ${alertDetail.alertDetail_imagePath}`);
                }
            });
            await this.prisma.alertDetail.deleteMany();
        }
        catch (error) {
            console.log('Cron Error: ');
            console.log(error);
        }
    }
};
exports.AlertDetailsService = AlertDetailsService;
__decorate([
    (0, schedule_1.Cron)('0 0 6 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertDetailsService.prototype, "cronDeleteAll", null);
exports.AlertDetailsService = AlertDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertDetailsService);
//# sourceMappingURL=alert-details.service.js.map