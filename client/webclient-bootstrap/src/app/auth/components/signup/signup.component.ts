import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { matchPassword } from 'src/app/shared/validator/confirm-password.validator';
import { validateName } from 'src/app/shared/validator/name.validator';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent {
  hide: boolean = true;
  signupForm!: FormGroup;
  userUniversity!: FormControl;
  userFName!: FormControl;
  userEmail!: FormControl;
  userPassword!: FormControl;
  confirmPassword!: FormControl;
  iAgree!: FormControl;
  constructor(private router: Router, private http: HttpService) {
    this.initFormControls();
    this.createForm();
  }

  initFormControls() {
    this.userUniversity = new FormControl('', [Validators.required]);
    this.userFName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60),
      validateName,
    ]);
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,30}$`),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,30}$`),
    ]);
    this.iAgree = new FormControl(null, [Validators.requiredTrue]);
  }

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
  onSubmit() {
    let FirstName = this.userFName.value
      .substr(0, this.userFName.value.indexOf(' '))
      .trim();
    let LastName = this.userFName.value
      .substr(this.userFName.value.indexOf(' ') + 1)
      .trim();
    if (!FirstName || !LastName)
      this.userFName.setErrors({ lastName: 'please enter a availd name' });
    let body = {
      userEmail: this.userEmail.value,
      userPassword: this.userPassword.value,
      userFName: FirstName,
      userLName: LastName,
      userUniversity: this.userUniversity.value,
    };

    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach((key) => {
        this.signupForm.controls[key].markAsDirty();
        this.signupForm.controls[key].markAsTouched();
      });
    } else {
      this.http.doPost(`${env.authRoot}/create`, body, {}).subscribe(
        async (res) => {
          let result = res as { token: string };
          localStorage.setItem('token', result.token);
          this.router.navigate(['/auth/email-sent', this.userEmail.value]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
