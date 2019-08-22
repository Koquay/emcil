import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { OrderService } from '../order/order.service';
import { Order, SearchCriteria } from '../shared/models/data-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
  private headerName = "PENDING ORDERS";
  private  orders:Order[];
  private  pendingOrders:Order[];
  private searchCriteria:SearchCriteria;
  private isLoading = true;
  
  constructor(
    private orderService:OrderService,
    private router:Router
  ) { 
    this.searchCriteria = new SearchCriteria();
  }

  ngOnInit() {
    this.getPendingOrdersOnInterval();
  }

  private getPendingOrdersOnInterval() {
    this.getPendingOrders();

    let orderInterval = interval(60000); //1000 = 1 seconds

    // orderInterval.subscribe(() => {
    //   console.log('****** INTERVAL *********', new Date().getMinutes());
    //   this.getOrdersByStatus();
    // })
  }

  private getPendingOrders() {
    this.isLoading = true;
    this.orderService.getOrdersByStatus("Pending").subscribe(orders => {
      this.orders = orders;
      this.isLoading = false;
    })
  }


  private searchOrder() {
    console.log('Order Search', this.searchCriteria)
    this.isLoading = true;
    this.orderService.searchOrder(this.searchCriteria).subscribe(orders => {
      this.pendingOrders = orders;
      this.isLoading = false;
    })
  }

  private getSearchedOrder(orderNo) {
    this.orderService.getSearchedOrder(orderNo).subscribe(order => {
      this.router.navigate(['/order-picker', orderNo])
    })
  }

}