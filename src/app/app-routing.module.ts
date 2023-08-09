import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { Auth, NoAuth } from './app-auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [Auth] },
  { path: "login", component: LoginComponent, canActivate: [NoAuth] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
