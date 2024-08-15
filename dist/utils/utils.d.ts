import { PrismaService } from 'src/prisma.service';
export declare const getFullAccountInfoFromEmail: (prisma: PrismaService, uploaderEmail: string) => Promise<{
    account_id: number;
    account_name: string;
    account_email: string;
    account_password: string;
    role_id: number;
}>;
export declare const getSecurityRoleFromDB: (prisma: PrismaService) => Promise<{
    role_id: number;
    role_name: string;
}>;
