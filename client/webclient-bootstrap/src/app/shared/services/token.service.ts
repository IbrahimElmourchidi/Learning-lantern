import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PayloadI } from 'src/app/shared/interfaces/payload.interface';
import { AppState, StateService } from 'src/app/shared/services/state.service';

@Injectable()
export class TokenService {
  appState!: AppState;
  constructor(
    private jwtService: JwtHelperService,
    private appStateService: StateService
  ) {
    this.appStateService.currentState.subscribe(
      (data) => (this.appState = data)
    );
  }
  tokenParser(token: string) {
    try {
      var tokenData: PayloadI = this.jwtService.decodeToken(token);
      localStorage.setItem('userId', tokenData.sub);
      localStorage.setItem('FirstName', tokenData.FirstName);
      localStorage.setItem('LastName', tokenData.LastName);
      localStorage.setItem('EmailConfirmed', tokenData.EmailConfirmed);
      localStorage.setItem(
        'Role',
        tokenData[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      );
    } catch (error) {
      console.log('invalid token');
    }
  }

  isLoggedIn(): boolean {
    try {
      if (!this.jwtService.isTokenExpired()) {
        this.appStateService.changeState({
          logedIn: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
