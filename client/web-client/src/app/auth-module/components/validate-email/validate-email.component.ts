import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { environment as env } from 'src/environments/environment';
/** this comonent is used to send email validation request to the api */
@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss'],
})
export class ValidateEmailComponent {
  /** the user id */
  userId: string;
  /** the validation code */
  ValidationCode: string;
  /**
   *
   * the constructor injects 4 services:
   *  1. ActivatedRoute: to get the id, validationcode from the url
   *  2. http: to make http request to the api
   *  3. router: to redirect
   *  4. snackBar: to show notification
   *
   * @param route
   * @param http
   * @param router
   * @param snackBar
   */
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private snackBar: SnackbarService
  ) {
    this.userId = this.route.snapshot.queryParamMap.get('id') || 'invalid id';
    this.ValidationCode =
      this.route.snapshot.queryParamMap.get('code') ||
      'Invalid validation code';
    this.validateEmail();
  }

  /**
   * send validate email request to the api
   */
  validateEmail() {
    this.http
      .doGet(`${env.authURL}/user/validate-email`, {
        params: {
          id: this.userId,
          code: this.ValidationCode,
        },
      })
      .subscribe(
        (res) => {
          let result = res as { token: string };
          localStorage.setItem('token', result.token);
          this.snackBar.openSnackBar('email validated successfully');
          this.router.navigate(['/']);
          console.log(res);
        },
        (err) => {
          this.snackBar.openSnackBar(`${err.error.message}`);
        }
      );
  }

  /** resend validation email */
  resendEmail() {
    this.validateEmail();
  }

  // todo: later we will implement the change email also, to handel the case
  //that the user entered wrong email
}
