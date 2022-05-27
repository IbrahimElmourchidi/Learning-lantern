import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ClassroomGuard } from '../shared/guards/classroom.guard';
import { EnglishComponent } from './components/english/english.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const englishRoutes: Routes = [
  {
    path: '',
    component: EnglishComponent,
    children: [{ path: 'welcome', component: WelcomeComponent }],
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../auth-module/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'classroom',
    canActivate: [ClassroomGuard],
    loadChildren: () =>
      import('../classroom-module/classroom.module').then(
        (m) => m.ClassroomModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(englishRoutes)],
  exports: [RouterModule],
})
export class EnglishRoutingModule {}
