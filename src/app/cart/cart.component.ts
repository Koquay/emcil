import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { Product } from '../shared/models/data-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private headerName = "SHOPPING CART";
  private destination = "CHECKOUT";
  private destinationIcon = "fa-check-square-o"
  private link = '/checkout';
  private order;
  private deleteItem;

  constructor(
    private cartService:CartService,
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  private getOrder() {
    this.cartService.getOrder().subscribe(order => {
      this.order = order;
      console.log('order', this.order)
    })
  }

  private getProductImg(productNo) {
    let img = this.productService.getProductImg(productNo)
      console.log('productNo', productNo);
      console.log('img', img);      
      return img;
  }

  private getProductDesc(productNo) {
    let description = this.productService.getProductDesc(productNo)   
    return description;
  }

  private getProductName(productNo) {
    return this.productService.getProductName(productNo)   

  }

  private increaseQuantity(item) {
    item.quantity += 1;
    this.getOrder();
  }

  private decreaseQuantity(item) {
    if(item.quantity > 1) {
      item.quantity -= 1;
      this.getOrder();
    }    
  }

  private removeItem(item) {
    this.cartService.removeItem(item).subscribe(order => {
      this.order = order;
    })
  }

  private setDeleteItem(item) {
    this.deleteItem = item;
  }

}
