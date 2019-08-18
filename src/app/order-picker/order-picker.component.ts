import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Product } from '../shared/models/data-model';
import { OrderPickerService } from './order-picker.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-order-picker',
  templateUrl: './order-picker.component.html',
  styleUrls: ['./order-picker.component.scss']
})
export class OrderPickerComponent implements OnInit {
  private headerName = "ORDER PICKER";
  private order: Order;
  private products: Product[];
  private isLoading = true;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private orderPickerService: OrderPickerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.findSelectedOrder();
  }

  private findSelectedOrder() {
    let orderNo = this.activatedRoute.snapshot.paramMap.get('orderNo');

    this.orderService.findSelectedOrder(orderNo).subscribe(order => {
      this.order = order;
      console.log('findSelecedOrder ', this.order)
      this.getProductsForOrder(orderNo);
    })
  }

  private getProductsForOrder(orderNo) {
    let prodNos = [];

    for (let item of this.order.order_items) {
      prodNos.push(item.product_no);
    }

    this.orderPickerService.getProductsForOrder(orderNo, prodNos).subscribe(products => {
      this.products = products;
    })
  }

  public getProductImg(productNo) {
    const product = this.products.find(product => product.product_no == productNo);
    return product.images[0];
  }

  public setOrderStatus() {
    console.log('status', this.order.status);
    if (this.order.order_items.length == 0) {
      return;
    }
    this.orderPickerService.setOrderStatus(this.order.order_no, this.order.status).subscribe(() => {
      this.router.navigate(['/pending-orders'])
    })
  }

  private deleteItem(orderId, itemId) {
    this.orderService.deleteItemFromOrder(orderId, itemId);
    this.orderPickerService.getOrderTotals(this.order);
    this.orderPickerService.deleteItemFromDB(this.order, itemId).subscribe(order => {
      this.findSelectedOrder();
      if(this.order.order_items.length == 0) {
        this.router.navigate(['/pending-orders'])
      }
    })
  }

}
