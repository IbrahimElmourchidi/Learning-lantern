import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/services/user.service';

/**
 * this guard checks if the request is comming from a user with a valid role or not
 */
@Injectable()
export class RoleGuard implements CanActivate {
  /**
   * the constructor
   * @param reflector is used to extract the roles from the metadate
   * @param userService is used to check the user role in the database
   */
  constructor(private reflector: Reflector, private userService: UserService) {}

  /**
   *
   * if the user has a valid role the he can activate the route
   *
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    const dbUser = await this.userService.getUserById(user['userId']);
    return this.matchRoles(roles, 'Student');
  }

  /**
   * check if the user role exists in the allowable role list
   * @param rolesList
   * @param role
   * @returns
   */
  private matchRoles(rolesList: string[], role: string): boolean {
    return rolesList.includes(role);
  }
}
