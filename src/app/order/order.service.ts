import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, SearchCriteria } from '../shared/models/data-model';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';
import { SalesTaxService } from '../shared/services/sales-tax.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = '/api/order/';
  private orderSearchUrl = '/api/order/search/';
  private orderSearchedUrl = '/api/order/';
  private orders: Order[];

  constructor(
    private httpClient: HttpClient,
    private messageService:MessageService,
    private salesTaxService:SalesTaxService
  ) { }

  public placeOrder(order: Order) {    

    order = this.computeTotals(order);

    return this.httpClient.post<Order>(this.orderUrl, { order: order }).pipe(
      tap(order => {
        console.log('order', order)
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  private computeTotals(order) {
    let province = (order.customer.shipping_address.province).trim().toUpperCase();
    let taxRate = this.salesTaxService.getTaxRate(province);

    order.tax = order.subtotal * taxRate;
    order.total = order.subtotal + order.tax;
    console.log('order with computed tax', order)
    return order;
  }

  public getOrdersByStatus(status) {
    return this.httpClient.get<Order[]>(`${this.orderUrl}${status}`).pipe(
      tap(orders => {
        console.log('orders', orders)
        this.orders = orders;
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public findSelectedOrder(orderNo) {
    let order = this.orders.find(order => order.order_no == orderNo);

    return of(order);
  }

  public searchOrder(searchCriteria: SearchCriteria) {
    let searchParams = this.buildSearchParams(searchCriteria);

    return this.httpClient.get<Order[]>(`${this.orderSearchUrl}${searchParams}`).pipe(
      tap(orders => console.log('search orders', orders)),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  private buildSearchParams(searchCriteria) {
    let searchParams = JSON.stringify({
      order_no: searchCriteria.order_no,
      phone: searchCriteria.phone,      
    });

    const params = `?searchCriteria=${searchParams}`
    console.log('search params', params)
    return params;
  }

  public getSearchedOrder(orderNo) {
    return this.httpClient.get<Order>(`${this.orderSearchedUrl}${orderNo}/1`).pipe(
      map(order => {
        console.log('getSearchedOrder', order);
        this.orders.push(order);
        return;
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public deleteItemFromOrder(orderId, itemId) {
    console.log('*** deleteItemFromOrder ***')
    console.log('orderId', orderId)
    console.log('itemId', itemId)
    

    let order = this.orders.find(order => order._id == orderId);
    console.log('*** deleteItemFromOrder order ***', order)

    if (order) {
      let index = order.order_items.findIndex(item => item._id == itemId);

      console.log('*** deleteItemFromOrder index ***', index)
      if (index > -1) {
        order.order_items.splice(index, 1);
      }
    }
  }

  public deleteOrder(orderId) {
    console.log('*** deleteOrder ***')

    let index = this.orders.findIndex(order => order._id == orderId);
    console.log('*** deleteOrder order index ***', index)

    if (index > -1) {
      this.orders.splice(index, 1);
    }

    return of([])
  }
}
