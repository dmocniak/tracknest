import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: SubscriptionListComponent },
  { path: 'account', component: AccountComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
