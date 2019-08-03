import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators'
import { Product } from '../shared/models/data-model';
import { Observable, of } from 'rxjs';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = '/api/product/';
  private products:Product[] = [];

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public getProductsByType(type) : Observable<Product[]> {
    let filter = this.products.filter(product => product.product_type == type);

    if(filter.length) {
      console.log('product exists in product array');
      return of(filter);
    }
    return this.httpClient.get<Product[]>(`${this.productUrl}${type}`).pipe(
      tap(products => {
        console.log('products', products)
        this.products = [...this.products, ...products];
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }

  public getProductById(id) {
    const product = this.products.find(product => product._id == id);
    return of(product);
  }

  public getProductImg(productNo) {
    const product = this.products.find(product => product.product_no == productNo);
    return product.images[0];
  }

  public getProductDesc(productNo) {
    const product = this.products.find(product => product.product_no == productNo);
    return product.description;
  }  
}
