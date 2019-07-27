import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {breadcrumb: 'Home'}
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule',
    data: {breadcrumb: 'Product'}
  },
  {
    path: 'product-display',
    loadChildren: './product-display/product-display.module#ProductDisplayModule',
    data: {breadcrumb: 'Product Display'}
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartModule'
  },
  {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule'
  },
  {
    path: 'order',
    loadChildren: './order/order.module#OrderModule'
  },
  {
    path: 'confirmation',
    loadChildren: './confirmation/confirmation.module#ConfirmationModule'
  },
  {
    path: '', pathMatch: 'prefix', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
