import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { findUserById } from './users/users.service';
import { permissions } from './users/utils/data';

export class AuthGuard implements CanActivate {
  constructor(private readonly permission: string) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['authorization'];

    const user = findUserById(userId);

    if (!user) {
      return false;
    }

    let userPermissions = [];
    user.roles.forEach((role) => {
      const permissionsPerRole = permissions.find((p) => p.code == role);
      if (permissionsPerRole) {
        userPermissions = userPermissions.concat(
          permissionsPerRole.permissions,
        );
      }
    });

    const hasPermission = userPermissions.includes(this.permission);

    return hasPermission;
  }
}
