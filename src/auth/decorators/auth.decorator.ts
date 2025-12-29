import { applyDecorators, UseGuards } from '@nestjs/common';
import { Authorize, ValidRoles } from './authorize.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRolesGuard } from '../guards/user-roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    Authorize(...roles),
    UseGuards(AuthGuard(), UserRolesGuard),
    ApiBearerAuth(),
  );
};
