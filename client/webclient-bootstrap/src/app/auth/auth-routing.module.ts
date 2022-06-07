import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthContainerComponent } from './components/container/container.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
