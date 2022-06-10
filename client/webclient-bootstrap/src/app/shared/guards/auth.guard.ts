import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtHelperService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.jwtService.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
