import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { ConfirmationService } from '../confirmation/confirmation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private headerName = 'Checkout';
  private destination = "VIEW SHOPPING CART";
  private destinationIcon = "fa-cart-arrow-down";
  private link = '/cart';
  private order;
  private expMonths;
  private expYears

  constructor(
    private cartService:CartService,
    private checkoutService:CheckoutService,
    private orderService:OrderService,
    private confirmationService:ConfirmationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getOrder();
    this.getStaticData();
  }

  private getOrder() {
    this.cartService.getOrder().subscribe(order => {
      this.order = order;
    })
  }

  private placeOrder() {
    console.log('order', this.order)
    this.orderService.placeOrder(this.order).subscribe(order => {
      this.router.navigate(['/confirmation']);
    })
  }

  private getStaticData() {
    this.checkoutService.getStaticData().subscribe(data => {
      this.expMonths = data[0];
      this.expYears = data[1];      
    })
  }

}
