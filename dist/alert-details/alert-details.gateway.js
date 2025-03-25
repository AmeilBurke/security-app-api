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
let AlertDetailsGateway = class AlertDetailsGateway {
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`${socket.id} - connected to Alert Details gateway @ ${(0, dayjs_1.default)()}`);
            socket.on('disconnect', () => {
                console.log(`${socket.id} - disconnected from Alert Details gateway @ ${(0, dayjs_1.default)()}`);
            });
            if (socket.recovered) {
                console.log(`${socket.id} - disconnected but recovered to Alert Details gateway @ ${(0, dayjs_1.default)()}`);
            }
        });
    }
    create(accountName, socket) {
        this.server.emit('alertDetailCreated', { message: `${accountName.account_name} has uploaded an alert` });
    }
};
exports.AlertDetailsGateway = AlertDetailsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AlertDetailsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('alertDetailCreated'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AlertDetailsGateway.prototype, "create", null);
exports.AlertDetailsGateway = AlertDetailsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
        connectionStateRecovery: {
            maxDisconnectionDuration: 1 * 60 * 1000,
            skipMiddleWares: false,
        },
    })
], AlertDetailsGateway);
//# sourceMappingURL=alert-details.gateway.js.map