import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { DashboardComponent } from './UserComponent/dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'coin-list',pathMatch:'full'},
  {path:'coin-list',component:CoinListComponent},
  {path:'coin-detail',component:CoinDetailComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard] },
  {path :'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
