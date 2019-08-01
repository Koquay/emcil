import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../shared/models/data-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private products:Product[];
  private headerName;
  private destination = "VIEW SHOPPING CART";
  private destinationIcon = "fa-cart-arrow-down";
  private link = '/cart';

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    } 

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.getProductsByType();
  }

  private getProductsByType() {
    let type = this.activatedRoute.snapshot.paramMap.get('product_type')
    console.log('product_type', type)
    this.productService.getProductsByType(type).subscribe(products => {
      this.products = products;
      this.headerName = this.products[0].product_type;
    })
  }

}
