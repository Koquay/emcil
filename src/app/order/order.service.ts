import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, SearchCriteria } from '../shared/models/data-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = '/api/order/';
  private orderSearchUrl = '/api/order/search/';  

  constructor(
    private httpClient:HttpClient
  ) { }

  public placeOrder(order:Order) {
    return this.httpClient.post<Order>(this.orderUrl, {order:order}).pipe(
      tap(order => {
        console.log('order', order)
      })
    )
  }

  public getOrders(status) {
    return this.httpClient.get<Order[]>(`${this.orderUrl}${status}`).pipe(
      tap(orders => console.log('orders', orders))
    )
  }

  public searchOrder(searchCriteria:SearchCriteria) {
    let searchParams = this.buildSearchParams(searchCriteria);

    return this.httpClient.get<Order[]>(`${this.orderSearchUrl}${searchParams}`).pipe(
      tap(orders => console.log('search orders', orders))
    )
  }

  private buildSearchParams(searchCriteria) {
    let searchParams = JSON.stringify( {
      order_no: searchCriteria.order_no,
      first_name: searchCriteria.first_name,
      last_name: searchCriteria.last_name,      
    });

    const params = `?searchCriteria=${searchParams}`
    console.log('search params', params)
    return params;
  }
}
