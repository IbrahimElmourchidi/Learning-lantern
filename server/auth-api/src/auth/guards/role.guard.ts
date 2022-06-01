import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'src/shared/enums/roles.enum';
import { UserService } from 'src/user/services/user-service/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const dbUser = await this.userService.getUserById(user['userId']);
    return this.matchRoles(roles, dbUser.role);
  }

  private matchRoles(rolesList: number[], role: number): boolean {
    return rolesList.includes(role);
  }
}
