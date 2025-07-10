import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
} from "@nestjs/common";
import { Response } from "express";
import { Public } from "src/authentication/public.guard";
import type { RequestWithAccount } from "src/types";
// biome-ignore lint/style/useImportType: <false positive>
import { AccountsService } from "./accounts.service";
import type { CreateAccountDto } from "./dto/create-account.dto";
import type { UpdateAccountDto } from "./dto/update-account.dto";

@Controller("accounts")
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@Post()
	create(
		@Req() request: RequestWithAccount,
		@Body() createAccountDto: CreateAccountDto,
	) {
		return this.accountsService.create(request, createAccountDto);
	}

	// used for when db is reset to make first account
	// @Public()
	// @Post('/secret')
	// createSecret(@Body() createAccountDto: CreateAccountDto) {
	//   return this.accountsService.createSecret(createAccountDto);
	// }

	@Get()
	findAll(@Req() request: RequestWithAccount) {
		return this.accountsService.findAll(request);
	}

	@Get(":id")
	findOne(@Req() request: RequestWithAccount, @Param("id") id: string) {
		return this.accountsService.findOne(request, Number(id));
	}

	@Patch(":id")
	update(
		@Req() request: RequestWithAccount,
		@Param("id") id: string,
		@Body() updateAccountDto: UpdateAccountDto,
	) {
		return this.accountsService.update(request, Number(id), updateAccountDto);
	}

	@Delete(":id")
	remove(@Req() request: RequestWithAccount, @Param("id") id: string) {
		return this.accountsService.remove(request, Number(id));
	}
}
