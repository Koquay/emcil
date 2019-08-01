import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Order } from '../shared/models/data-model';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderPickerService {
  private orderProductUrl = '/api/order/prodForOrder/';
  private orderStatusUrl = '/api/order/status/';
  private itemDeleteUrl = '/api/order/deleteItem/1/';
  private order:Order;
  
  constructor(
    private httpClient:HttpClient
  ) { }

  public getProductsForOrder(orderNo, prodNos) {
      let prodNosStr =JSON.stringify(prodNos)
      return this.httpClient.get<Product[]>(`${this.orderProductUrl}${orderNo}?prodNos=${prodNosStr}`)
      .pipe(
        tap(products => {console.log('products', products)})
      )
  }

  public setOrderStatus(orderNo, status) {
    return this.httpClient.post(this.orderStatusUrl, {orderNo:orderNo, status:status})
    .pipe(
      tap(orders => {console.log('orders', orders)})
    )
  }

  public deleteItemFromDB(order, itemId) {
    console.log('order to delete from DB', order)
    return this.httpClient.post<Order>(this.itemDeleteUrl, {order:order, itemId:itemId})
    .pipe(
      tap(order => console.log('order after delete', order))
    )
  }

  public getOrderTotals(order) {
    this.order = order;
    this.order.subtotal = this.getSubtotal();
    this.order.discount = this.getDiscount();
    this.order.tax = this.getTax();
    this.order.total = this.getTotal();    
    return of(this.order)
  }

  public getTax() {
    return this.getSubtotal() * .10;
  }

  public getDiscount() {
    return this.getSubtotal() * .10;
  }

  public getTotal() {
    return this.getSubtotal() + this.getTax() - this.getDiscount();
  }

  public getSubtotal() {
    let subtotal = 0;

    for(let item of this.order.order_items) {
      subtotal += item.price * item.quantity;
    }

    return subtotal;
  }
}
