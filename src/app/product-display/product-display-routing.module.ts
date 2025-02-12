import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDisplayComponent } from './product-display.component';


const routes: Routes = [
  {
    path: ':id',
    component: ProductDisplayComponent,
    data: { breadcrumb: 'Product Display'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDisplayRoutingModule { }
