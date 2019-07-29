import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPickerRoutingModule } from './order-picker-routing.module';
import { OrderPickerComponent } from './order-picker.component';
import { SharedModule } from '../shared/modules/shared/shared.module';


@NgModule({
  declarations: [OrderPickerComponent],
  imports: [
    CommonModule,
    OrderPickerRoutingModule,
    SharedModule
  ]
})
export class OrderPickerModule { }
