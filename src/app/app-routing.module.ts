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
    path: '', pathMatch: 'prefix', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
