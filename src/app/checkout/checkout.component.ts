import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { ConfirmationService } from '../confirmation/confirmation.service';
import { Router } from '@angular/router';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { MessageService } from '../shared/message/message/message.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  private headerName = 'Checkout';
  private destination = "VIEW SHOPPING CART";
  private destinationIcon = "fa-cart-arrow-down";
  private link = '/cart';
  private order;
  private expMonths;
  private expYears

  private elements: Elements;
  private card: StripeElement;

  private elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private stripeService: StripeService,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.getOrder();
    this.getStaticData();
  }

  ngAfterViewInit() {
    this.initCreditCard();
  }

  private getOrder() {
    this.cartService.getOrder().subscribe(order => {
      this.order = order;
      console.log('order from cartService', this.order)
    })
  }

  private placeOrder() {
    this.stripeService.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
        this.order.card_token = result.token.id
        console.log('order', this.order)
        this.orderService.placeOrder(this.order).subscribe(order => {
          let newOrder = JSON.parse(JSON.stringify(order));
          this.confirmationService.setOrder(newOrder);
          this.resetOrder();
          this.router.navigate(['/confirmation']);
        })
      } else if (result.error) {
        console.log('result.error', result.error.message);
        this.messageService.sendInfo("There is a problem charging your credit card. Please enter correct information");
        return;        
      }
    });
  }

  private initCreditCard() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;

      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: 'Roboto, "Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0',
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  private getStaticData() {
    this.checkoutService.getStaticData().subscribe(data => {
      this.expMonths = data[0];
      this.expYears = data[1];
    })
  }

  private resetOrder() {
    this.order = null;
    console.log('order after nulled', this.order)
    // this.cartService.resetOrder();
    // this.getOrder();
  }


}
