import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos desde los metadatos
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // Si no se especificaron roles, se permite el acceso por defecto
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Validar que el token contenga usuario y roles
    if (!user || !Array.isArray(user.roles)) {
      throw new ForbiddenException(
        'Acceso denegado: el token no contiene roles válidos.',
      );
    }

    // Validar si el usuario tiene al menos uno de los roles requeridos
    const isAuthorized = requiredRoles.some((role) =>
      user.roles.includes(role),
    );

    if (!isAuthorized) {
      throw new ForbiddenException(
        `Acceso denegado: se requiere uno de los siguientes roles: [${requiredRoles.join(
          ', ',
        )}]`,
      );
    }

    return true;
  }
}
