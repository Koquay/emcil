import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared/shared.module';



@NgModule({
  declarations: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
