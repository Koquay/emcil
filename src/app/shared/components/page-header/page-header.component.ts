import { Component, OnInit, Input } from '@angular/core';
import { CreateSessionCapabilities } from 'selenium-webdriver';
import { CartService } from '../../../cart/cart.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() headerName: String;
  @Input() destination: String;
  @Input() destinationIcon: String;
  @Input() link: String;
  
  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
  }

}
