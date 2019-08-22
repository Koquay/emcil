import { Injectable } from '@angular/core';
import { Order, Product, OrderItem } from '../shared/models/data-model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public order:Order = null;
  
  constructor() { }

  public addToCart(product:Product, quantity=1, size=null) {
    if(!this.order) {
      this.order = new Order();
      this.order.order_no = Math.floor((Math.random() * 1000000) + 1);
    }

    let orderItem = new OrderItem();
    orderItem.product_no = product.product_no;
    orderItem.price = product.price;
    orderItem.quantity = quantity;
    orderItem.size = size;
    this.order.order_items.push(orderItem);

    console.log('order', this.order)

    return of(this.order);
  }  

  public getOrder() {
    this.order.subtotal = this.getSubtotal();
    // this.order.discount = this.getDiscount();
    // this.order.tax = this.getTax();
    this.order.total = this.getTotal();    
    return of(this.order)
  }

  // public getDiscount() {
  //   return this.getSubtotal() * .10;
  // }

  public getTotal() {
    return this.getSubtotal();
  }

  public getSubtotal() {
    let subtotal = 0;

    for(let item of this.order.order_items) {
      subtotal += item.price * item.quantity;
    }

    return subtotal;
  }

  public removeItem(itemToRemove) {
    let index = this.order.order_items.findIndex(item => 
      item.product_no == itemToRemove.product_no && item.size == itemToRemove.size);

      if (index >= 0) {
        this.order.order_items.splice(index, 1);
      }

      return this.getOrder();
  }

  public resetOrder() {
    this.order = null;
  }
}