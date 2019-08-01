import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isOverlay = false;

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
  }

  private showOverlay() {
    console.log('SHOW OVERLAY')
    this.isOverlay = true;
  }

  private hideOverlay() {
    console.log('HIDE OVERLAY')
    this.isOverlay = false;
  }
}


