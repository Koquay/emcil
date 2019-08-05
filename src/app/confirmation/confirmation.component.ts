import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { Order } from '../shared/models/data-model';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  private headerName = "CONFIRMATION";
  private destination = "CONTINUE SHOPPING";
  private destinationIcon = "fa-arrow-right";
  private link = '/home';
  private order:Order;

  constructor(
    private confirmationService:ConfirmationService,
    private productService:ProductService,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  private getOrder() {
    this.confirmationService.getOrder().subscribe(order => {
      this.order = order;
      this.cartService.resetOrder();
    })
  }

  private getProductImg(productNo) {
    return this.productService.getProductImg(productNo);
  }

  private getProductDesc(productNo) {
    return this.productService.getProductDesc(productNo);
  }
  

}
