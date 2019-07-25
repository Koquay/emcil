import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'
import { Product } from '../shared/models/data-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = '/api/product/';
  private products:Product[];

  constructor(
    private httpClient:HttpClient
  ) { }

  public getProductsByType(type) : Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.productUrl}${type}`).pipe(
      tap(products => {
        console.log('products', products)
        this.products = products;
      })
    )
  }

  public getProductById(id) {
    const product = this.products.find(product => product._id == id);
    return of(product);
  }
}
