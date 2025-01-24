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
exports.BannedPeopleGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const banned_people_service_1 = require("./banned-people.service");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let BannedPeopleGateway = class BannedPeopleGateway {
    constructor(bannedPeopleService, jwtService) {
        this.bannedPeopleService = bannedPeopleService;
        this.jwtService = jwtService;
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`${socket.id} - connected to Banned People gateway`);
            if (socket.recovered) {
                console.log(`session: ${socket.id} recovered`);
            }
        });
    }
    async create(createBannedPerson, client) {
        if (!client.handshake.headers.jwt) {
            return 'no valid JWT token found';
        }
        const payload = await this.jwtService.verifyAsync(String(client.handshake.headers.jwt), { secret: process.env.JWT_SECRET });
        let fileExtension;
        switch (createBannedPerson.fileData[0]) {
            case '/':
                fileExtension = 'jpg';
                break;
            case 'i':
                fileExtension = 'png';
                break;
            case 'U':
                fileExtension = 'webp';
        }
        const imageName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const filePath = path.join('src\\images\\people', `${imageName}`);
        const fileBuffer = Buffer.from(createBannedPerson.fileData, 'base64');
        fs.writeFileSync(filePath, fileBuffer);
        return this.bannedPeopleService.create(payload, createBannedPerson, imageName, this.server);
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
    __metadata("design:returntype", Promise)
], BannedPeopleGateway.prototype, "create", null);
exports.BannedPeopleGateway = BannedPeopleGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, connectionStateRecovery: true }),
    __metadata("design:paramtypes", [banned_people_service_1.BannedPeopleService,
        jwt_1.JwtService])
], BannedPeopleGateway);
//# sourceMappingURL=banned-people.gateway.js.map