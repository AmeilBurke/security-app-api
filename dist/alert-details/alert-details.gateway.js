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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDetailsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const alert_details_service_1 = require("./alert-details.service");
const uuid_1 = require("uuid");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let AlertDetailsGateway = class AlertDetailsGateway {
    constructor(alertDetailsService, jwtService) {
        this.alertDetailsService = alertDetailsService;
        this.jwtService = jwtService;
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`${socket.id} - connected`);
        });
    }
    async create(createAlertDetailDto, client) {
        const payload = await this.jwtService.verifyAsync(String(client.handshake.headers.jwt), { secret: process.env.JWT_SECRET });
        let fileExtension;
        switch (createAlertDetailDto.fileData[0]) {
            case "/":
                fileExtension = 'jpg';
                break;
            case "i":
                fileExtension = 'png';
                break;
            case "U":
                fileExtension = 'webp';
        }
        const imageName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const filePath = path.join('src\\images\\people', `${imageName}.${fileExtension}`);
        const fileBuffer = Buffer.from(createAlertDetailDto.fileData, 'base64');
        fs.writeFileSync(filePath, fileBuffer);
        console.log(filePath);
        return this.alertDetailsService.create(payload, createAlertDetailDto, imageName, fileExtension, this.server);
    }
};
exports.AlertDetailsGateway = AlertDetailsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AlertDetailsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createAlertDetail'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AlertDetailsGateway.prototype, "create", null);
exports.AlertDetailsGateway = AlertDetailsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [alert_details_service_1.AlertDetailsService,
        jwt_1.JwtService])
], AlertDetailsGateway);
//# sourceMappingURL=alert-details.gateway.js.map