import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { roles } = context.switchToHttp().getRequest().user as User;

    const validRoles = this.reflector.get(
      'roles',
      context.getHandler(),
    ) as string[];

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    for (const { name } of roles) {
      if (validRoles.includes(name)) return true;
    }

    throw new UnauthorizedException(
      `The user does not have sufficient permissions`,
    );
  }
}
