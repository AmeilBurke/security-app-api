/** biome-ignore-all lint/style/useImportType: <false positive> */
import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import  { Reflector } from "@nestjs/core";
import  { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import { IS_PUBLIC_KEY } from "./public.guard";

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromCookie(request);

		if (token === undefined) {
			throw new UnauthorizedException("invalid token");
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			});
			request["account"] = payload;
		} catch {
			throw new UnauthorizedException("invalid token");
		}
		return true;
	}

	private extractTokenFromCookie(request: Request): string | undefined {
		return request.cookies["jwt"];
	}
}
