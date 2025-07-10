import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AccountsModule } from "src/accounts/accounts.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

@Module({
	controllers: [AuthenticationController],
	providers: [
		AuthenticationService,
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard,
		},
	],
	imports: [
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "5 days" },
		}),
		AccountsModule,
	],
})
export class AuthenticationModule {}
