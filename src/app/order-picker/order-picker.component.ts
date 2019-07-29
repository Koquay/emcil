import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../shared/models/data-model';

@Component({
  selector: 'app-order-picker',
  templateUrl: './order-picker.component.html',
  styleUrls: ['./order-picker.component.scss']
})
export class OrderPickerComponent implements OnInit {
  private headerName = "ORDER PICKER";
  private order:Order;
  
  constructor(
    private orderService:OrderService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.findSelectedOrder();
  }

  private findSelectedOrder() {
    let orderNo = this.activatedRoute.snapshot.paramMap.get('orderNo');

    this.orderService.findOrder(orderNo).subscribe(order => {
      this.order = order;
    })
  }

}
