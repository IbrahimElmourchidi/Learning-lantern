import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment as env } from 'src/environments/environment';
import { SignupI } from 'src/app/shared/interfaces/signup-body.interface';
import { HttpService } from 'src/app/shared/services/http.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { matchPassword } from 'src/app/validators/confirm-password.validator';
import { validateName } from 'src/app/validators/validate-name.validator';

/**
 * this is the component for the signup form
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  /** show or hide the password , if true the password will be hidden */
  hide = true;
  /** the university list that are using our services this will later
   * be requested from the admin api.
   */
  universitiesList = [
    { id: 1, name: 'Assiut University' },
    { id: 2, name: 'EELU' },
  ];
  /** the singup formgroup */
  signupForm!: FormGroup;
  /** the universitylist field */
  userUniversity!: FormControl;
  /** the user full name field */
  userFName!: FormControl;
  /** the user email field */
  userEmail!: FormControl;
  /** the user password field */
  userPassword!: FormControl;
  /** the confirm password field */
  confirmPassword!: FormControl;
  /** the agree on terms & conditions check box */
  iAgree!: FormControl;
  /**
   *
   * the constructor injects 3 services:
   *   1. Router: for redirection
   *   2. http: for making http request
   *   3. snackBar: for showing notification
   *
   * @param router
   * @param http
   * @param snackBar
   */
  constructor(
    private router: Router,
    private http: HttpService,
    private snackBar: SnackbarService
  ) {
    this.initFormControls();
    this.createForm();
  }

  /**
   * initialize the form fields, this function is callied in the constructor
   */
  initFormControls() {
    this.userUniversity = new FormControl('Assiut University', [
      Validators.required,
    ]);
    this.userFName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      validateName,
    ]);
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(`^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$`),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(`^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{8,30}$`),
    ]);
    this.iAgree = new FormControl(null, [Validators.requiredTrue]);
  }
  /** create the login form , this function is called in the constructor */
  createForm() {
    this.signupForm = new FormGroup(
      {
        userUniversity: this.userUniversity,
        userFName: this.userFName,
        userEmail: this.userEmail,
        userPassword: this.userPassword,
        confirmPassword: this.confirmPassword,
        iAgree: this.iAgree,
      },
      matchPassword
    );
  }
  /**
   *
   * this function splits the full name to first and last name and makes sure
   * that the user didn't used empty spaces for the name
   *
   * @returns {firstName:string, lastName:string}
   */
  checkName(): { firstName: string; lastName: string } {
    let fullName = this.userFName.value as string;
    let firstName = fullName.substring(0, fullName.indexOf(' ')).trim();
    let lastName = fullName.substring(fullName.indexOf(' ') + 1).trim();
    console.log(firstName, lastName);
    if (!firstName || !lastName) {
      this.userFName.setErrors({ lastName: 'please enter a availd name' });
      return { firstName, lastName };
    } else return { firstName, lastName };
  }
  /**
   * send creat user to the apihttp request when submiting the form
   */
  onSubmit() {
    let { firstName, lastName } = this.checkName();
    let body: SignupI = {
      userEmail: this.userEmail.value,
      userPassword: this.userPassword.value,
      userFName: firstName,
      userLName: lastName,
    };
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach((key) => {
        this.signupForm.controls[key].markAsDirty();
        this.signupForm.controls[key].markAsTouched();
      });
    } else {
      this.http.doPost(`${env.authURL}/user/signup`, body, {}).subscribe(
        (res) => {
          let result = res as { Id: string; Email: string };
          localStorage.setItem('userId', JSON.stringify(result.Id));
          this.snackBar.openSnackBar('Account Created Successfully');
          console.log(result.Email);
          this.router.navigate([
            '/en/auth/message-sent',
            {
              email: result.Email,
            },
          ]);
        },
        (err) => {
          this.snackBar.openSnackBar(`${err.message}`);
        }
      );
    }
  }
}
