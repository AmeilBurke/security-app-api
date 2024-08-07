import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '@prisma/client';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Role[] | String> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role | String> {
    return this.rolesService.findOne(Number(id));
  }
}
