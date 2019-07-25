import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDisplayRoutingModule } from './product-display-routing.module';
import { ProductDisplayComponent } from './product-display.component';
import { SharedModule } from '../shared/modules/shared/shared.module';


@NgModule({
  declarations: [ProductDisplayComponent],
  imports: [
    CommonModule,
    ProductDisplayRoutingModule,
    SharedModule
  ]
})
export class ProductDisplayModule { }
