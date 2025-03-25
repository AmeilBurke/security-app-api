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
exports.BannedPeopleGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const dayjs_1 = __importDefault(require("dayjs"));
const socket_io_1 = require("socket.io");
let BannedPeopleGateway = class BannedPeopleGateway {
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`${socket.id} - connected to Banned People gateway @ ${(0, dayjs_1.default)()}`);
            socket.on('disconnect', () => {
                console.log(`${socket.id} - disconnected from Banned People gateway @ ${(0, dayjs_1.default)()}`);
            });
            if (socket.recovered) {
                console.log(`${socket.id} - disconnected but recovered to Banned People gateway @ ${(0, dayjs_1.default)()}`);
            }
        });
    }
    create(accountName, socket) {
        this.server.emit('bannedPersonCreated', {
            message: `${accountName.account_name} has uploaded a new ban`,
        });
    }
};
exports.BannedPeopleGateway = BannedPeopleGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BannedPeopleGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('addBannedPerson'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], BannedPeopleGateway.prototype, "create", null);
exports.BannedPeopleGateway = BannedPeopleGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
        connectionStateRecovery: true,
        pingInterval: 25000,
        pingTimeout: 60000,
    })
], BannedPeopleGateway);
//# sourceMappingURL=banned-people.gateway.js.map