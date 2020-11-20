import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildTransactionComponent } from './components/child-transaction/child-transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'home', component:TransactionsComponent},
  {path:'child-transaction/:id', component:ChildTransactionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
