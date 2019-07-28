import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { Order } from '../shared/models/data-model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  private headerName = "CONFIRMATION";
  private order:Order;

  constructor(
    private confirmationService:ConfirmationService,
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  private getOrder() {
    this.confirmationService.getOrder().subscribe(order => {
      this.order = order;
    })
  }

  private getProductImg(productNo) {
    return this.productService.getProductImg(productNo);
  }

  private getProductDesc(productNo) {
    return this.productService.getProductDesc(productNo);
  }
  

}
