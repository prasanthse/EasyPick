import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoadingPage } from './Pages/loading/loading.page';
import { LoginPagePage } from './Pages/login-page/login-page.page';
import { HomePagePage } from './Pages/home-page/home-page.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingPage
  },
  {
    path: 'login',
    component: LoginPagePage
  },
  {
    path: 'home',
    component: HomePagePage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
