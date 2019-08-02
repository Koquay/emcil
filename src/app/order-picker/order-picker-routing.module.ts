import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPickerComponent } from './order-picker.component';


const routes: Routes = [
  {
    path: ':orderNo',
    component: OrderPickerComponent,
    data: { breadcrumb: 'Order Picker'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPickerRoutingModule { }
