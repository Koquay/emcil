import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingOrdersComponent } from './pending-orders.component';


const routes: Routes = [
  {
    path: '',
    component: PendingOrdersComponent,
    data: { breadcrumb: 'Pending Orders'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingOrdersRoutingModule { }
