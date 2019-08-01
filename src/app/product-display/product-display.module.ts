import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDisplayRoutingModule } from './product-display-routing.module';
import { ProductDisplayComponent } from './product-display.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductDisplayComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductDisplayRoutingModule,
    SharedModule
  ]
})
export class ProductDisplayModule { }
