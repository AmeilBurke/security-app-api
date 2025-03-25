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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const accounts_service_1 = require("../accounts/accounts.service");
const utils_1 = require("../utils");
const bcrypt = require('bcrypt');
let AuthenticationService = class AuthenticationService {
    constructor(accountsService, jwtService) {
        this.accountsService = accountsService;
        this.jwtService = jwtService;
    }
    async signIn(email, password, response) {
        const account = await this.accountsService.findOneByEmail(email);
        if ((0, utils_1.isPrismaResultError)(account)) {
            return account;
        }
        if (await bcrypt.compare(password, account.account_password)) {
            const jwt = await this.jwtService.signAsync({ sub: account.account_id, email: account.account_email });
            response.cookie('jwt', jwt, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });
            return `logged in as ${account.account_name}`;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        jwt_1.JwtService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map