import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthenticationModule } from "./authentication/authentication.module";

@Module({
	imports: [
		AuthenticationModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ScheduleModule.forRoot(),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "images"),
			serveRoot: "/images",
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
