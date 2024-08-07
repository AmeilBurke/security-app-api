import { RolesService } from './roles.service';
import { Role } from '@prisma/client';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(): Promise<Role[] | String>;
    findOne(id: string): Promise<Role | String>;
}
