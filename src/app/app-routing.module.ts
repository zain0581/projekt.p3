import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { DashboardComponent } from './UserComponent/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { AddCoinComponent } from './add-coin/add-coin.component';
import { CryptoCurrencyComponent } from './crypto-currency/crypto-currency.component';
import { IntegrationComponent } from './integration/integration.component';
import { ReportsComponent } from './reports/reports.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PricesComponent } from './prices/prices.component';
import { WalletComponent } from './wallet/wallet.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';




const routes: Routes = [
  {path:'',redirectTo:'coin-list',pathMatch:'full'},
  {path:'coin-list',component:CoinListComponent},
  {path:'coin-detail',component:CoinDetailComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard] },
  {path:'coin/add',component:AddCoinComponent},
  {path:'crypto-currency',component:CryptoCurrencyComponent},
  {path:'Integration',component:IntegrationComponent},
  {path:'Reports',component:ReportsComponent},
  {path:'Transactions',component:TransactionsComponent},
  {path:'Prices',component:PricesComponent},
  {path:'Wallet',component:WalletComponent},
  {path:'about',component:AboutComponent},
  {path :'**',component:NotFoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // static efac=function AppRoutingModule_Factory(t) { return new( t ||AppRoutingModule)();};
 }
