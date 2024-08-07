import { PrismaService } from 'src/prisma.service';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<string | {
        role_id: number;
        role_name: string;
    }[]>;
    findOne(id: number): Promise<string | {
        role_id: number;
        role_name: string;
    }>;
}
