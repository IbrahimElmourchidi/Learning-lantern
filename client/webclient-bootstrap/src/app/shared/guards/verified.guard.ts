import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtHelperService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      if (this.jwtService.isTokenExpired()) {
        this.router.navigate(['/auth/login']);
        return false;
      } else if (this.jwtService.decodeToken().EmailConfirmed) {
        return true;
      }
      this.router.navigate(['/auth/email-sent/Your Email']);
      return false;
    } catch (error) {
      this.router.navigate(['/auth/email-sent/Your Email']);
      return false;
    }
  }
}
