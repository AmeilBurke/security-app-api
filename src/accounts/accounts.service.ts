/** biome-ignore-all lint/style/useImportType: <multiple false positives> */
import { Injectable } from "@nestjs/common";
import { Account, Prisma } from "@prisma/client";
import { hashPassword } from "src/bcrypt/bcrypt";
import { PrismaService } from "src/prisma.service";
import {
	AccountWithRoleNoPassword,
	PrismaResultError,
	RequestWithAccount,
} from "src/types";
import {
	accountIsUnauthorized,
	getAccountInfoFromId,
	handleError,
	isAccountAdminRole,
	isAccountSecurityRole,
	isAccountVenueManagerRole,
	isPrismaResultError,
	noRequestAccountError,
} from "src/utils";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Injectable()
export class AccountsService {
	constructor(private prisma: PrismaService) {}

	async create(
		request: RequestWithAccount,
		createAccountDto: CreateAccountDto,
	): Promise<
		Prisma.AccountGetPayload<{ include: { role: true } }> | PrismaResultError
	> {
		if (!request.account.sub) {
			return noRequestAccountError();
		}

		const requestAccount = await getAccountInfoFromId(
			this.prisma,
			request.account.sub,
		);

		if (isPrismaResultError(requestAccount)) {
			return requestAccount;
		}

		if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
			return accountIsUnauthorized();
		}

		const newAccount = await this.prisma.account.create({
			data: {
				email: createAccountDto.email.toLocaleLowerCase().trim(),
				name: createAccountDto.name.toLocaleLowerCase().trim(),
				password: await hashPassword(createAccountDto.password),
				role: { connect: { id: createAccountDto.roleId } },
			},
		});

		const allVenueIds = await this.prisma.venue.findMany({
			select: {
				id: true,
			},
		});

		if (await isAccountVenueManagerRole(this.prisma, newAccount)) {
			createAccountDto.managesVenueIds.map(async (venueIds) => {
				await this.prisma.venueAccess.create({
					data: {
						venueId: venueIds,
						accountId: newAccount.id,
					},
				});

				await this.prisma.venueManager.create({
					data: {
						venueId: venueIds,
						accountId: newAccount.id,
					},
				});
			});
		}

		if (
			(await isAccountAdminRole(this.prisma, newAccount)) ||
			(await isAccountSecurityRole(this.prisma, newAccount))
		) {
			allVenueIds.map(async (venueId) => {
				await this.prisma.venueAccess.create({
					data: {
						venueId: venueId.id,
						accountId: newAccount.id,
					},
				});
			});
		}

		try {
			return this.prisma.account.findFirstOrThrow({
				where: {
					id: newAccount.id,
				},
				include: {
					role: true,
					accesses: true,
					manages: true,
				},
			});
		} catch (error: unknown) {
			return handleError(error);
		}
	}

	// need to see if used anywhere else except in auth guard
	async findOneByEmail(
		email: string,
	): Promise<
		Prisma.AccountGetPayload<{ include: { role: true } }> | PrismaResultError
	> {
		try {
			return await this.prisma.account.findFirstOrThrow({
				where: {
					email: {
						equals: email,
						mode: "insensitive",
					},
				},
				include: {
					role: true,
				},
			});
		} catch (error: unknown) {
			return handleError(error);
		}
	}

	// Used if the database is wiped to create accounts without admin privileges
	async createSecret(createAccountDto: CreateAccountDto): Promise<Account> {
		return await this.prisma.account.create({
			data: {
				email: createAccountDto.email,
				name: createAccountDto.name,
				password: await hashPassword(createAccountDto.password),
				role: { connect: { id: createAccountDto.roleId } },
			},
		});
	}

	async findAll(
		request: RequestWithAccount,
	): Promise<AccountWithRoleNoPassword[] | PrismaResultError> {
		try {
			if (!request.account.sub) {
				return noRequestAccountError();
			}

			const requestAccount = await getAccountInfoFromId(
				this.prisma,
				request.account.sub,
			);

			if (isPrismaResultError(requestAccount)) {
				return requestAccount;
			}

			if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
				return accountIsUnauthorized();
			}

			return this.prisma.account.findMany({
				omit: {
					password: true,
					roleId: true,
				},
				orderBy: {
					name: "asc",
				},
				include: {
					role: true,
				},
			});
		} catch (error: unknown) {
			return handleError(error);
		}
	}

	async findOne(
		request: RequestWithAccount,
		id: number,
	): Promise<AccountWithRoleNoPassword | PrismaResultError> {
		if (!request.account.sub) {
			return noRequestAccountError();
		}

		const requestAccount = await getAccountInfoFromId(
			this.prisma,
			request.account.sub,
		);

		if (isPrismaResultError(requestAccount)) {
			return requestAccount;
		}

		if (
			!(await isAccountAdminRole(this.prisma, requestAccount)) &&
			requestAccount.id !== id
		) {
			return accountIsUnauthorized();
		}

		try {
			return await this.prisma.account.findFirstOrThrow({
				where: {
					id: id,
				},
				omit: {
					password: true,
					roleId: true,
				},
				include: {
					role: true,
				},
			});
		} catch (error: unknown) {
			return handleError(error);
		}
	}

	async update(
		request: RequestWithAccount,
		id: number,
		updateAccountDto: UpdateAccountDto,
	): Promise<AccountWithRoleNoPassword | PrismaResultError> {
		if (!request.account.sub) {
			return noRequestAccountError();
		}

		const requestAccount = await getAccountInfoFromId(
			this.prisma,
			request.account.sub,
		);

		if (isPrismaResultError(requestAccount)) {
			return requestAccount;
		}

		if (
			!(await isAccountAdminRole(this.prisma, requestAccount)) &&
			requestAccount.id !== id
		) {
			return accountIsUnauthorized();
		}

		try {
			await this.prisma.account.update({
				where: {
					id: id,
				},
				data: {
					email: updateAccountDto.email
						? updateAccountDto.email.toLocaleLowerCase().trim()
						: updateAccountDto.email,
					name: updateAccountDto.name
						? updateAccountDto.name.toLocaleLowerCase().trim()
						: updateAccountDto.name,
					password: updateAccountDto.password
						? await hashPassword(updateAccountDto.password)
						: updateAccountDto.password,
					roleId: updateAccountDto.roleId,
				},
			});

			if (updateAccountDto.managesVenueIds) {
				await this.prisma.venueManager.deleteMany({
					where: {
						accountId: id,
					},
				});

				await this.prisma.venueManager.createMany({
					data: updateAccountDto.managesVenueIds.map((venueId) => {
						return { accountId: id, venueId };
					}),
				});
			}

			return await this.prisma.account.findFirstOrThrow({
				where: {
					id: id,
				},
				omit: {
					password: true,
					roleId: true,
				},
				include: {
					role: true,
				},
			});
		} catch (error: unknown) {
			return handleError(error);
		}
	}

	async remove(
		request: RequestWithAccount,
		id: number,
	): Promise<string | PrismaResultError> {
		if (!request.account.sub) {
			return noRequestAccountError();
		}

		const requestAccount = await getAccountInfoFromId(
			this.prisma,
			request.account.sub,
		);

		if (isPrismaResultError(requestAccount)) {
			return requestAccount;
		}

		if (!(await isAccountAdminRole(this.prisma, requestAccount))) {
			return accountIsUnauthorized();
		}

		try {
			await this.prisma.venueAccess.deleteMany({
				where: {
					accountId: id,
				},
			});

			await this.prisma.venueManager.deleteMany({
				where: {
					accountId: id,
				},
			});

			await this.prisma.alertDetail.updateMany({
				where: {
					uploadedById: id,
				},
				data: {
					uploadedById: requestAccount.id,
				},
			});

			await this.prisma.banDetail.updateMany({
				where: {
					uploadedById: id,
				},
				data: {
					uploadedById: requestAccount.id,
				},
			});

			const deletedAccount = await this.prisma.account.delete({
				where: {
					id: id,
				},
			});

			return `account deleted: ${deletedAccount.name}`;
		} catch (error: unknown) {
			return handleError(error);
		}
	}
}
