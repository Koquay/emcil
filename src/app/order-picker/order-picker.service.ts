import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Order } from '../shared/models/data-model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';
import { SalesTaxService } from '../shared/services/sales-tax.service';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPickerService {
  private orderProductUrl = '/api/order/prodForOrder/';
  private orderStatusUrl = '/api/order/status/';
  private orderRefundUrl = '/api/order/refund/1/2/';
  private itemDeleteUrl = '/api/order/deleteItem/1/';
  private order:Order;
  
  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService,
    private salesTaxService:SalesTaxService,
    private orderService:OrderService
  ) { }

  public getProductsForOrder(orderNo, prodNos) {
      let prodNosStr =JSON.stringify(prodNos)
      return this.httpClient.get<Product[]>(`${this.orderProductUrl}${orderNo}?prodNos=${prodNosStr}`)
      .pipe(
        tap(products => {console.log('products', products)}),
        catchError(error => {
          console.log('error', error)
          this.messageService.sendErrorMessage(error);
          throw error;
        })
      )
  }

  public setOrderStatus(orderNo, status) {
    return this.httpClient.post(this.orderStatusUrl, {orderNo:orderNo, status:status})
    .pipe(
      tap(orders => {console.log('orders', orders)}),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public refundCard(refundInfo) {
    return this.httpClient.post<Order>(this.orderRefundUrl, refundInfo)
    .pipe(
      tap(order => console.log('order after refund', order)),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public deleteItemFromDB(order, item) {
    console.log('order to delete from DB', order)
    let itemAmount = this.getItemAmount(order, item);
    return this.httpClient.post<Order>(
      this.itemDeleteUrl, 
      {order:order, itemId:item._id, itemAmount:itemAmount}
    )
    .pipe(
      tap(order => {
        console.log('order after delete', order)
    }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  private getItemAmount(order, item) {
    let province = (order.customer.shipping_address.province).trim().toUpperCase();
    let taxRate = this.salesTaxService.getTaxRate(province);

    let itemAmount = item.price * item.quantity;  
    let tax = itemAmount * taxRate;
    itemAmount = itemAmount + tax;
    console.log('itemAmount to refund', itemAmount)   
    return itemAmount.toPrecision(2);
  }

  public getOrderTotals(order) {
    this.order = order;
    this.order.subtotal = this.getSubtotal();
    
    let province = (order.customer.shipping_address.province).trim().toUpperCase();
    let taxRate = this.salesTaxService.getTaxRate(province);
    this.order.tax = this.order.subtotal * taxRate;
    this.order.total = this.getTotal() + this.order.tax;  

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
}
