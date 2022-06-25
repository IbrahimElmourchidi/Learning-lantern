import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/classroom/services/chat.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { AppState, StateService } from 'src/app/shared/services/state.service';

import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  appState!: AppState;
  loginForm!: FormGroup;
  userUniversity!: FormControl;
  userEmail!: FormControl;
  userPassword!: FormControl;
  constructor(
    private router: Router,
    private http: HttpService,
    private state: StateService
  ) {
    this.initFormControls();
    this.createForm();
  }

  ngOnInit(): void {
    this.state.currentState.subscribe((state) => (this.appState = state));
  }

  initFormControls() {
    this.userUniversity = new FormControl('', [Validators.required]);
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,30}$`),
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      userUniversity: this.userUniversity,
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].markAsTouched();
      });
    } else {
      let body_ = {
        userEmail: this.userEmail.value,
        userPassword: this.userPassword.value,
        userUniversity: this.userUniversity.value,
      };
      this.http.doPost(`${env.authRoot}/login`, body_, {}).subscribe(
        (res: any) => {
          let result = res as { token: string };
          localStorage.setItem('token', result.token);
          this.state.changeState({
            logedIn: true,
          });

          location.href = '/';
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
