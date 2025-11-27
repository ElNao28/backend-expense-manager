import { SetMetadata } from '@nestjs/common';

export enum ValidRoles {
  Admin = 'admin',
  User = 'user',
}

export const Authorize = (...roles: ValidRoles[]) => {
  return SetMetadata('roles', roles);
};
