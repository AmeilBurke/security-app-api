import type { RequestWithAccount } from "src/types";
import { AccountsService } from "./accounts.service";
import type { CreateAccountDto } from "./dto/create-account.dto";
import type { UpdateAccountDto } from "./dto/update-account.dto";
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(request: RequestWithAccount, createAccountDto: CreateAccountDto): Promise<import("src/types").PrismaResultError | ({
        role: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        id: number;
        email: string;
        password: string;
        roleId: number;
    })>;
    findAll(request: RequestWithAccount): Promise<import("src/types").PrismaResultError | import("src/types").AccountWithRoleNoPassword[]>;
    findOne(request: RequestWithAccount, id: string): Promise<import("src/types").PrismaResultError | import("src/types").AccountWithRoleNoPassword>;
    update(request: RequestWithAccount, id: string, updateAccountDto: UpdateAccountDto): Promise<import("src/types").PrismaResultError | import("src/types").AccountWithRoleNoPassword>;
    remove(request: RequestWithAccount, id: string): Promise<string | import("src/types").PrismaResultError>;
}
