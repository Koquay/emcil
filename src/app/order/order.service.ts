import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/models/data-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = '/api/order/';

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
}
