import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Role[] | String>;
    findOne(id: number): Promise<Role | String>;
}
