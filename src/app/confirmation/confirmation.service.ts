import { Injectable } from '@angular/core';
import { Order } from '../shared/models/data-model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private order:Order;
  
  constructor() { }

  public setOrder(order) {
    this.order = order;
  }

  public getOrder() {
    return of(this.order);
  }
}
