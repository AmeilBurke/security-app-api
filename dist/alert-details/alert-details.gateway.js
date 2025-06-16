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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const dayjs_1 = __importDefault(require("dayjs"));
const jwt_1 = require("@nestjs/jwt");
const authentication_service_1 = require("../authentication/authentication.service");
const prisma_service_1 = require("../prisma.service");
const utils_1 = require("../utils");
let AlertDetailsGateway = class AlertDetailsGateway {
    constructor(jwtService, authenticationService, prisma) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.prisma = prisma;
    }
    onModuleInit() {
        this.server.on('connection', async (socket) => {
            if (!socket.handshake.headers.cookie) {
                console.error(`WS ERROR: ${socket.id} - Missing JWT cookie`);
                socket.emit('missing_jwt', {
                    error_type: 'WS MISSING COOKIE',
                });
                socket.disconnect();
                return;
            }
            const accountJwtDetails = await this.jwtService.verifyAsync(socket.handshake.headers.cookie.split('=')[1], { secret: process.env.JWT_SECRET });
            if (!accountJwtDetails.sub) {
                socket.disconnect();
                return {
                    error_type: 'WS MISSING COOKIE',
                };
            }
            console.log(`${socket.id} - connected to Alert Details gateway @ ${(0, dayjs_1.default)()}`);
            socket.on('disconnect', () => {
                console.log(`${socket.id} - disconnected from Alert Details gateway @ ${(0, dayjs_1.default)()}`);
            });
            if (socket.recovered) {
                console.log(`${socket.id} - disconnected but recovered to Alert Details gateway @ ${(0, dayjs_1.default)()}`);
            }
        });
    }
    createAlert(message) {
        this.server.emit('alertCreated', {
            message: `${(0, utils_1.capitalizeString)(message.account_name)} has uploaded a new ban`,
        });
    }
};
exports.AlertDetailsGateway = AlertDetailsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AlertDetailsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createAlert'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlertDetailsGateway.prototype, "createAlert", null);
exports.AlertDetailsGateway = AlertDetailsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['https://172.20.112.1:5173', 'https://localhost:5173'],
            credentials: true,
        },
        allowEIO3: true,
        connectionStateRecovery: {
            maxDisconnectionDuration: 1 * 60 * 1000,
            skipMiddleWares: false,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        authentication_service_1.AuthenticationService,
        prisma_service_1.PrismaService])
], AlertDetailsGateway);
//# sourceMappingURL=alert-details.gateway.js.map