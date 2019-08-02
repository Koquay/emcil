import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HeaderRoutingModule
  ]
})
export class HeaderModule { }
