import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(): Promise<String | {
        role_id: number;
        role_name: string;
    }[]>;
    findOne(id: string): Promise<String | {
        role_id: number;
        role_name: string;
    }>;
}
