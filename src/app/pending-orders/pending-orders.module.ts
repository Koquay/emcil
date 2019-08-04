import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingOrdersRoutingModule } from './pending-orders-routing.module';
import { PendingOrdersComponent } from './pending-orders.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';

import {NgxMaskModule, IConfig} from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [PendingOrdersComponent],
  imports: [
    CommonModule,
    FormsModule,
    PendingOrdersRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options),
  ]
})
export class PendingOrdersModule { }
