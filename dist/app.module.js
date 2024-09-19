"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const accounts_module_1 = require("./accounts/accounts.module");
const banned_people_module_1 = require("./banned-people/banned-people.module");
const authentication_module_1 = require("./authentication/authentication.module");
const config_1 = require("@nestjs/config");
const alert_details_module_1 = require("./alert-details/alert-details.module");
const businesses_module_1 = require("./businesses/businesses.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            accounts_module_1.AccountsModule,
            banned_people_module_1.BannedPeopleModule,
            authentication_module_1.AuthenticationModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            alert_details_module_1.AlertDetailsModule,
            businesses_module_1.BusinessesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map