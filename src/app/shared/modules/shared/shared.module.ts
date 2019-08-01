import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MessageComponent } from '../../message/message/message.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    PageHeaderComponent,
    MessageComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    MessageComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
