import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartGuard } from './cart.guard';


const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [CartGuard],
    data: { breadcrumb: 'Cart'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
