import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPickerRoutingModule } from './order-picker-routing.module';
import { OrderPickerComponent } from './order-picker.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrderPickerRoutingModule,
    SharedModule
  ]
})
export class OrderPickerModule { }
