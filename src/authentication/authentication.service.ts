/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";
import { AccountsService } from "src/accounts/accounts.service";
import { PrismaService } from "src/prisma.service";
import type { AccountWithRoleNoPassword, PrismaResultError } from "src/types";
import {
	addJwtCookieToRequest,
	handleError,
	isPrismaResultError,
} from "src/utils";

const bcrypt = require("bcrypt");

@Injectable()
export class AuthenticationService {
	constructor(
		private accountsService: AccountsService,
		private jwtService: JwtService,
		private prisma: PrismaService,
	) {}

	async signIn(
		email: string,
		password: string,
		response: Response,
	): Promise<AccountWithRoleNoPassword | PrismaResultError> {
		const account = await this.accountsService.findOneByEmail(email);

		if (isPrismaResultError(account)) {
			return account;
		}

		if (await bcrypt.compare(password, account.password)) {
			await addJwtCookieToRequest(
				response,
				this.jwtService,
				account.id,
				account.email,
			);

			const { password: _password, roleId: _roleId, ...result } = account;

			return result;
		} else {
			throw new UnauthorizedException();
		}
	}

	async getAccountDetails(
		accountId: number,
		response: Response,
	): Promise<AccountWithRoleNoPassword | PrismaResultError> {
		try {
			const account = await this.prisma.account.findFirst({
				where: {
					id: accountId,
				},
				include: {
					role: true,
				},
			});

			const { password: _password, roleId: _roleId, ...result } = account;

			await addJwtCookieToRequest(
				response,
				this.jwtService,
				account.id,
				account.email,
			);

			return result;
		} catch (error: unknown) {
			console.log(error);
			return handleError(error);
		}
	}
}
