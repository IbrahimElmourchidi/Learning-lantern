import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FavLangService } from './shared/services/fav-lang.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: new FavLangService().getFavLang(),
    pathMatch: 'full',
  },
  {
    path: 'en',
    loadChildren: () =>
      import('./english/english.module').then((m) => m.EnglishModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
