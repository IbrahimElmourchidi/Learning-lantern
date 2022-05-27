import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { environment as env } from 'src/environments/environment';

/**
 * this component is responsible for the login form
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /** hide or show the password */
  hide = true;
  /**
   * university list : later this will get requested from the admin api
   */
  universityList = [
    { id: 1, name: 'Assiut University' },
    { id: 2, name: 'EELU' },
  ];
  /** the login form group */
  loginForm!: FormGroup;
  /** user university */
  userUniversity!: FormControl;
  /** the email of the user */
  userEmail!: FormControl;
  /** the user's password */
  userPassword!: FormControl;
  /**
   *
   * the constructor injects 3 services:
   *  1. http : to making Ajax requests
   *  2. snackBar:  to show notifications for the user
   *  3. router : for navigation
   * @param http
   * @param snackBar
   * @param router
   */
  constructor(
    private http: HttpService,
    private snackBar: SnackbarService,
    private router: Router
  ) {
    this.initFormControls();
    this.createForm();
  }
  /**
   * initialize the form controls
   */
  initFormControls() {
    this.userUniversity = new FormControl('', [Validators.required]);
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(`^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$`),
    ]);
  }

  /**
   * initialize the form
   */
  createForm() {
    this.loginForm = new FormGroup({
      userUniversity: this.userUniversity,
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });
  }

  /** login the user */
  login() {
    if (this.loginForm.valid) {
      let body = {
        userEmail: this.userEmail.value,
        userPassword: this.userPassword.value,
      };

      this.http.doPost(`${env.authURL}/user/login`, body, {}).subscribe(
        (res) => {
          let result = res as { token: string };
          localStorage.setItem('token', result.token);
          this.snackBar.openSnackBar('login successfully');
          this.router.navigate(['/en/classroom/mycourses']);
        },
        (err) => {
          this.snackBar.openSnackBar(`${err.message}`);
        }
      );
    }
  }
}
