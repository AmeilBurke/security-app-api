import { Account } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare const handleError: (error: unknown) => string;
export declare const getAccountInfoFromId: (prisma: PrismaService, id: number) => Promise<Account | string>;
export declare const isAccountAdminRole: (prisma: PrismaService, account: Account) => Promise<Boolean>;
