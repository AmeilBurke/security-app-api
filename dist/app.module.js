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
const authentication_module_1 = require("./authentication/authentication.module");
const config_1 = require("@nestjs/config");
const accounts_module_1 = require("./accounts/accounts.module");
const banned_people_module_1 = require("./banned-people/banned-people.module");
const alert_details_module_1 = require("./alert-details/alert-details.module");
const schedule_1 = require("@nestjs/schedule");
const venues_module_1 = require("./venues/venues.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            authentication_module_1.AuthenticationModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            accounts_module_1.AccountsModule,
            banned_people_module_1.BannedPeopleModule,
            alert_details_module_1.AlertDetailsModule,
            schedule_1.ScheduleModule.forRoot(),
            venues_module_1.VenuesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map