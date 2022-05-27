import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { LoginComponent } from './components/login/login.component';
import { MessageSentComponent } from './components/message-sent/message-sent.component';
import { SignupComponent } from './components/signup/signup.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';

const routes: Routes = [
  {
    path: '',
    component: FormContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: 'validate-email',
    component: ValidateEmailComponent,
  },
  {
    path: 'message-sent',
    component: MessageSentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
