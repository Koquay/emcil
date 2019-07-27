import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/data-model';
import { ProductService } from '../product/product.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../shared/message/message/message.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  private product:Product;
  private displayImage;
  private size = null;
  private destination = "VIEW SHOPPING CART";
  private destinationIcon = "fa-cart-arrow-down";
  private link = '/cart';
  
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private messageService:MessageService,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.getProductById();
  }

  private getProductById() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.displayImage = this.product.images[0];
      console.log('product', product)
    })    
  }

  private setDisplayImage(image) {
    this.displayImage = image;
  }

  private setSize(size) {
    this.size = size;
    console.log('size', size)
  }

  private addToCart() {
    if(this.product.available_sizes.length) {
      if(this.size == null) {
        this.messageService.sendInfo("You must select a size to add this item.")
        return;
      }
    }    

    this.cartService.addToCart(this.product, 1, this.size).subscribe(order => {
      console.log('Item added to cart')
      this.messageService.sendSuccess("Item added to your cart.")
      this.size = null;
    })
    
  }

}
