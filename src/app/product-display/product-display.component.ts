import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/data-model';
import { ProductService } from '../product/product.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../shared/message/message/message.service';
import { CartService } from '../cart/cart.service';
import { ProductDisplayService } from './product-display.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  private product:Product;
  private similarProducts:Product[];
  private displayImage;
  private size = null;
  private destination = "VIEW SHOPPING CART";
  private destinationIcon = "fa-cart-arrow-down";
  private link = '/cart';
  private quantities;
  private quantity = 1;

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private messageService:MessageService,
    private cartService:CartService,
    private productDisplayService:ProductDisplayService
  ) { }

  ngOnInit() {
    this.getProductById();
    this.getQuantityData();
  }

  private getProductById() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.displayImage = this.product.images[0];
      this.getSimilarProducts();
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

    this.cartService.addToCart(this.product, this.quantity, this.size).subscribe(order => {
      console.log('Item added to cart')
      this.messageService.sendSuccess("Item added to your cart.")
      this.size = null;
    })
    
  }


  private getQuantityData() {
    this.productDisplayService.getQuantityData().subscribe(quantities => {
      this.quantities = quantities;
    })
  }

  private showQuantity() {
    console.log('quantity', this.quantity)
  }

  private getSimilarProducts() {
    this.productService.getSimilarProducts(this.product.product_no, this.product.product_type)
    .subscribe(products => {
      this.similarProducts = products;
    })
  }
}
