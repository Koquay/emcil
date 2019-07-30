import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/data-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderPickerService {
  private orderProductUrl = '/api/order/prodForOrder/';
  private orderStatusUrl = '/api/order/status/';

  constructor(
    private httpClient:HttpClient
  ) { }

  public getProductsForOrder(orderNo, prodNos) {
    console.log('prodNos', prodNos)
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

}
