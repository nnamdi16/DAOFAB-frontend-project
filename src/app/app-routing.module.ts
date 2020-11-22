import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildTransactionComponent } from './components/child-transaction/child-transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  {path:'', redirectTo:'/transactions/1', pathMatch:'full'},
  {path:'transactions/:id', component:TransactionsComponent},
  {path:'child-transaction/:id', component:ChildTransactionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
