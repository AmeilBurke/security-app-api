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
const ban_details_module_1 = require("./ban-details/ban-details.module");
const venue_managers_module_1 = require("./venue-managers/venue-managers.module");
const venue_bans_module_1 = require("./venue-bans/venue-bans.module");
const venue_access_module_1 = require("./venue-access/venue-access.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
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
            venues_module_1.VenuesModule,
            ban_details_module_1.BanDetailsModule,
            venue_managers_module_1.VenueManagersModule,
            venue_bans_module_1.VenueBansModule,
            venue_access_module_1.VenueAccessModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'images'),
                serveRoot: '/images',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map