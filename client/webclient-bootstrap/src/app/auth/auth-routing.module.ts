import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthContainerComponent } from './components/container/container.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'email-sent',
        // canActivate: [AuthGuard],
        component: EmailSentComponent,
      },
      {
        path: 'validate-email',
        component: ValidateEmailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
