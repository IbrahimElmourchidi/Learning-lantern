import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EnglishModule } from '../english/english.module';
import { MaterialModule } from '../shared/modules/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { LoginComponent } from './components/login/login.component';
import { MessageSentComponent } from './components/message-sent/message-sent.component';
import { SignupComponent } from './components/signup/signup.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';

@NgModule({
  declarations: [
    FormContainerComponent,
    LoginComponent,
    SignupComponent,
    ValidateEmailComponent,
    MessageSentComponent,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    EnglishModule,
  ],
})
export class AuthModule {}
