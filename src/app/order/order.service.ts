import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, SearchCriteria } from '../shared/models/data-model';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = '/api/order/';
  private orderSearchUrl = '/api/order/search/';
  private orderSearchedUrl = '/api/order/';  
  private orders:Order[];

  constructor(
    private httpClient: HttpClient
  ) { }

  public placeOrder(order: Order) {
    return this.httpClient.post<Order>(this.orderUrl, { order: order }).pipe(
      tap(order => {
        console.log('order', order)
      })
    )
  }

  public getOrders(status) {
    return this.httpClient.get<Order[]>(`${this.orderUrl}${status}`).pipe(
      tap(orders => {
        console.log('orders', orders)
        this.orders = orders;
      })
    )
  }

  public findOrder(orderNo) {
    let order = this.orders.find(order => order.order_no == orderNo);

    return of(order);
  }

  public searchOrder(searchCriteria: SearchCriteria) {
    let searchParams = this.buildSearchParams(searchCriteria);

    return this.httpClient.get<Order[]>(`${this.orderSearchUrl}${searchParams}`).pipe(
      tap(orders => console.log('search orders', orders))
    )
  }

  private buildSearchParams(searchCriteria) {
    let searchParams = JSON.stringify({
      order_no: searchCriteria.order_no,
      first_name: searchCriteria.first_name,
      last_name: searchCriteria.last_name,
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
      })
    )
  }
}
