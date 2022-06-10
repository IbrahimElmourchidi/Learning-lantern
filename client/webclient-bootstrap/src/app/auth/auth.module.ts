import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './components/container/container.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';

@NgModule({
  declarations: [
    AuthContainerComponent,
    LoginComponent,
    SignupComponent,
    EmailSentComponent,
    ValidateEmailComponent,
  ],
  imports: [AuthRoutingModule, CommonModule, ReactiveFormsModule, NgbModule],
  providers: [],
})
export class AuthModule {}
