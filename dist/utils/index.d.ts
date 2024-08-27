import { PrismaService } from 'src/prisma.service';
export declare const getRoleFromDB: (prisma: PrismaService, roleName: string) => Promise<{
    role_id: number;
    role_name: string;
}>;
export declare const getAccountWithEmail: (prisma: PrismaService, email: string) => Promise<{
    account_id: number;
    account_email: string;
    account_name: string;
    account_password: string;
    account_roleId: number;
}>;
export declare const handleError: (error: unknown) => string;
