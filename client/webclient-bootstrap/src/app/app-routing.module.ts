import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'class',
    loadChildren: () =>
      import('./classroom/classroom.module').then((m) => m.ClassroomModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
